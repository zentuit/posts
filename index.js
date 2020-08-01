import commandLineArgs from 'command-line-args'

const options = [
  {
    name: 'help',
    description: 'Display this usage guide.',
    alias: 'h',
    type: Boolean
  },
  {
    name: 'file',
    alias: 'f',
    description: 'The input file of posts to process.',
    type: String,
    typeLabel: '{underline file} ...'
  },
  {
    name: 'rules',
    alias: 'r',
    description: 'JSON file of rules to use against posts',
    type: String,
    typeLabel: '{underline file} ...'
  }
]

console.log(options)
const usage = commandLineArgs(options)
console.log(usage)