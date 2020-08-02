const fs = require('fs')
const parse = require('csv-parse/lib/sync')

// we're loading the posts synchronously
// TODO - investigate async loading if we have large files
const loadPosts = (filename) => {
    if (!filename) {
        throw 'Posts input file name must be provided'
    }
    const posts = fs.readFileSync(filename)
    return parse(posts, {
        columns: true,
        skip_empty_lines: true,
        relax: true,
      })
}

module.exports = loadPosts