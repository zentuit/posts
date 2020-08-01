import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { options, usage } from './src/commandLine.js'
import loadPosts from './src/loadPosts.js'

// Main function
function run() {
  const args = commandLineArgs(options)
  if (args.help) {
    console.log(commandLineUsage(usage))
    process.exit()
  }
  const posts = loadPosts(args.file)
  
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
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString())
  shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString())
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