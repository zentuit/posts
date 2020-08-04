const rules = require('./rules.js')
const { loadRulesEngine, engine } = rules


describe('Rules engine', () => {
    test.each`
        title | post | expected
        ${'Views under 9000 should fail'} | ${{ id: 1, title: 'Under viewed', privacy: 'public', likes: 95, views: 8999, comments: 11, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
        ${'Views equal 9000 should fail'} | ${{ id: 2, title: '9000 views', privacy: 'public', likes: 95, views: 9000, comments: 11, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
        ${'Views over 9000 should succeed'} | ${{ id: 3, title: '9001 view', privacy: 'public', likes: 95, views: 9001, comments: 11, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${true}
        ${'Comments equal 10 should fail'} | ${{ id: 4, title: '10 comments', privacy: 'public', likes: 95, views: 10000, comments: 10, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
        ${'Comments over 10 should succeed'} | ${{ id: 5, title: '11 comments', privacy: 'public', likes: 95, views: 10000, comments: 11, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${true}
        ${'Comments under 10 should fail'} | ${{ id: 5, title: '9 comments', privacy: 'public', likes: 95, views: 10000, comments: 9, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
        ${'Title equals 39 should succeed'} | ${{ id: 6, title: 'Title equal 39 characters abcdefghijklm', privacy: 'public', likes: 95, views: 10000, comments: 109, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${true}
        ${'Title equals 40 should fail'} | ${{ id: 6, title: 'Title equal 40 characters abcdefghijklmn', privacy: 'public', likes: 95, views: 10000, comments: 109, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
        ${'Title over 40 should fail'} | ${{ id: 7, title: 'Title over 40 characters abcdefghijklmnopqrstuvwxyz', privacy: 'public', likes: 95, views: 10000, comments: 1099, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}]
        ${'Private should fail'} | ${{ id: 8, title: 'Private post', privacy: 'private', likes: 95, views: 10000, comments: 100, timestamp: 'Thu Oct 03 02:05:34 2015' }} | ${false}
    `('$title', async ({ title, post, expected }) => {
        let success = false
        let fail = false
        const successEvent = (event, almanac, ruleResult) => {
            success = true
        }
        const failEvent = (event, almanac, ruleResult) => {
            fail = true
        }
        loadRulesEngine(successEvent, failEvent, null)
        await engine.run({ post })
        expect(success).toBe(expected)
        expect(fail).toBe(!expected)
    })
})