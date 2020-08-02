import path from 'path'
import fs from 'fs'
import stringify from 'csv-stringify/lib/sync.js'


const prep = (records, asJSON, fullRecord) => {
    const results = fullRecord
        ? records
        : records.map(record => { return { id: record.id} })
    
    return asJSON
        ? JSON.stringify(results)
        : stringify(results)
}

const writeFile = (filename, records) => {
    fs.writeFileSync(filename, records)
}

const outputResults = (results, dir = './out', asJSON = false, fullRecord = false) => {
    // output the flat lists 
    const topPosts = prep(results.topPosts, asJSON, fullRecord)
    const otherPosts = prep(results.otherPosts, asJSON, fullRecord)
    
    // extract the daily values for outputting
    const dailyTopPosts = prep(results.dailyTopPosts.values(), asJSON, true)

    const extension = asJSON ? '.json' : 'csv'
    const buildFilename = (name) => {
        return `${dir}${path.sep}${name}.${extension}`
    }
    writeFile(buildFilename('top_posts'), topPosts)
    writeFile(buildFilename('other_posts'), otherPosts)
    writeFile(buildFilename('daily_top_posts'), dailyTopPosts)
}

export default outputResults
