


const outputResults = (results, dir) => {
    console.log('----------')
    console.log(results.dailyTopPosts)
    console.log(`top posts count: ${results.topPosts.length}`)
    console.log(`other posts count: ${results.otherPosts.length}`)
}

export default outputResults
