import fs from 'fs'
import csv from 'csv'

// we're loading the posts synchronously
// TODO - investigate async loading if we have large files
export default function(filename) {
    if (!filename) {
        throw 'Posts input file name must be provided'
    }
    const posts = fs.readFileSync(filename)
    return csv.parse(posts, {
        columns: true,
        skip_empty_lines: true,
        relax: true,
      })
}