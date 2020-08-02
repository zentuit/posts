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
        name: 'dir',
        alias: 'd',
        description: 'The directory to write the output csvs (defaults to ./out).',
        type: String,
        typeLabel: '{underline dir} ...'
      },
      {
        name: 'as-json',
        description: 'Output the results as JSON files.',
        type: Boolean,
      },
      {
        name: 'full-record',
        description: 'Output the results as full records instead of just IDs.',
        type: Boolean,
      },
      {
        name: 'pretty-print',
        description: 'Output the JSON results pretty printed (2 space indentation).',
        type: Boolean,
      },
      {
      name: 'rules',
      alias: 'r',
      description: 'JSON file of rules to use against posts',
      type: String,
      typeLabel: '{underline rules_file} ...'
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