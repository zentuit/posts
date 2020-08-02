const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const datefns = require('date-fns')
const commandLine = require('./src/commandLine')
const loadPosts = require('./src/loadPosts')
const rules = require('./src/rules')
const outputResults = require('./src/outputResults')

const { format, parse } = datefns
const { options, usage } = commandLine
const { loadRulesEngine, engine } = rules

const topPosts = []
const otherPosts = []
const dailyTopPosts = new Map()

// Main function
async function main() {
  const args = commandLineArgs(options)
  if (args.help) {
    console.log(commandLineUsage(usage))
    process.exit()
  }
  // set up the rules engine
  loadRulesEngine(successEvent, failEvent, args.rules)
  // load posts and run them through the rules engine
  const posts = loadPosts(args.file)
  // const results = await processPosts(posts, engine)
  await processPosts(posts, engine)
  outputResults({ topPosts, otherPosts, dailyTopPosts }, args.output, args['as-json'], args['full-record'], args['pretty-print'])
}

const successEvent = (event, almanac, ruleResult) => {
  // we have a successful top post so we add it to the list of top posts
  // and if update daily top post if its better
  almanac.factValue('post')
    .then(post => {
      topPosts.push(post)
      const parsed = parse(post.timestamp, 'EEE LLL dd HH:mm:ss yyyy', new Date())
      const date = format(parsed, 'MM/dd/yyyy')
      const daily = dailyTopPosts.get(date) || { likes: -1 }
      if (post.likes > daily.likes) {
        dailyTopPosts.set(date, post)
      }
    })
}

const failEvent = (event, almanac, ruleResult) => {
  // post didn't make top post so stick in 'other'
  almanac.factValue('post')
    .then(post => {
      otherPosts.push(post)
    })
}

const processPosts = async (posts, engine) => {
  await Promise.all(posts.map((post) => { 
    return engine.run({ post }) 
  }))
}

// Set up some process listeners...
process.on('uncaughtException', (error) => {
  console.error(`Uncaught exception: ${error}`, new Date().toISOString())
  shutdown(error)
})

process.on('unhandledRejection', (error) => {
  console.error(`Promise rejection: ${error}`, new Date().toISOString())
  shutdown(error)
})

// ... including OS signals
// quit on ctrl-c when running docker in terminal
process.on('SIGINT', () => {
	console.info('Got SIGINT. Graceful shutdown ', new Date().toISOString())
  shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info('Got SIGTERM. Graceful shutdown ', new Date().toISOString())
  shutdown()
})

// shut down server
function shutdown(err) {
  if (err) {
    console.error(err)
    process.exitCode = 1
  }
  process.exit()
}

main()