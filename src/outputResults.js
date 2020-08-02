import path from 'path'
import fs from 'fs'
import stringify from 'csv-stringify/lib/sync.js'


const prep = (records, asJSON, fullRecord, pretty) => {
    const results = fullRecord
        ? records
        : records.map(record => { return { id: record.id} })
    
    if (asJSON) {
        return pretty
            ? JSON.stringify(results, null, 2)
            : JSON.stringify(results)
    }    

    return stringify(results)
}

const writeFile = (filename, records) => {
    fs.writeFileSync(filename, records)
}

const outputResults = (results, dir = './out', asJSON = false, fullRecord = false, pretty = false) => {
    // output the flat lists 
    const topPosts = prep(results.topPosts, asJSON, fullRecord, pretty)
    const otherPosts = prep(results.otherPosts, asJSON, fullRecord, pretty)
    
    // extract the daily values for outputting
    const dailyTopPosts = prep([...results.dailyTopPosts.values()], asJSON, true, pretty)

    const extension = asJSON ? 'json' : 'csv'
    const buildFilename = (name) => {
        return `${dir}${path.sep}${name}.${extension}`
    }
    writeFile(buildFilename('top_posts'), topPosts)
    writeFile(buildFilename('other_posts'), otherPosts)
    writeFile(buildFilename('daily_top_posts'), dailyTopPosts)
}

export default outputResults
