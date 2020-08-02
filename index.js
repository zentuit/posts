import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import datefns from 'date-fns';
import { options, usage } from './src/commandLine.js'
import loadPosts from './src/loadPosts.js'
import { loadRulesEngine, engine } from './src/rules.js'

const { format, parse } = datefns;

const topPosts = []
const otherPosts = []
const dailyTopPosts = {}

// Main function
function run() {
  const args = commandLineArgs(options)
  if (args.help) {
    console.log(commandLineUsage(usage))
    process.exit()
  }
  // set up the rules engine
  loadRulesEngine(successEvent, failEvent, args.rules)
  // load posts and run them through the rules engine
  const posts = loadPosts(args.file)
  // const promises = posts.map((post) => { 
  //   engine.run({ post }) 
  // })
  Promise.all(posts.map((post) => { 
    return engine.run({ post }) 
  }))
    .then(() => {
      console.log(dailyTopPosts)
      console.log(`top posts count: ${topPosts.length}`)
      console.log(`other posts count: ${otherPosts.length}`)
    })
}

const successEvent = (event, almanac, ruleResult) => {
  // we have a successful top post so we add it to the list of top posts
  // and if update daily top post if its better
  almanac.factValue('post')
    .then(post => {
      topPosts.push(post)
      const parsed = parse(post.timestamp, 'EEE LLL dd HH:mm:ss yyyy', new Date())
      const date = format(parsed, 'MM/dd/yyyy')
      const daily = dailyTopPosts[date] || { likes: 0 }
      if (post.likes > daily.likes) {
        dailyTopPosts[date] = post
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

run()