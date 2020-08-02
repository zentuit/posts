import fs from 'fs'
import parse from 'csv-parse/lib/sync.js'

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

export default loadPosts