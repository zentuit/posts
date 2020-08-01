// Set up command line args
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
      description: 'The CSV input file of posts to process.',
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
  
  const usage = [
    {
      header: 'Code Challenge',
      content: 'Analyze Posts data and produce 3 output files.'
    },
    {
      header: 'Options',
      optionList: options
    },
  ]
  
export {
    options,
    usage
}  