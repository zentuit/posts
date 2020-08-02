import jre from 'json-rules-engine'
const { Engine } = jre

/**
 * We'll use a JSON rules engine (https://github.com/cachecontrol/json-rules-engine)
 * to handle checking each post against the required rules
 */


/**
 * Define default rules
 */
const defaultRules = {
    conditions: {
        all: [{
            fact: 'post',
            operator: 'equal',
            value: 'public',
            path: '$.privacy'
        }, {
            fact: 'post',
            operator: 'greaterThan',
            value: 10,
            path: '$.comments'
        }, {
            fact: 'post',
            operator: 'greaterThan',
            value: 9000,
            path: '$.views'
        }, {
            fact: 'post',
            operator: 'maxLength',
            value: 40,
            path: '$.title'
        }]
    },
    event: {
        type: 'top-post',
    }
}

const loadRules = (filename) => {
    throw 'External rules not implemented yet'
}

const engine = new Engine()


/**
 * Initialize the rules engine
 * @param {function} successEvent event handler on successful rules test
 * @param {function} failEvent event handler on failure of rules test
 * @param {string} rulesJSON optional filename of JSON rules file
 */
const loadRulesEngine = (successEvent, failEvent, rulesJSON = null) => {
    const rules = rulesJSON ? loadRules(rulesJSON) : defaultRules

    // Define a 'maxLength' custom operator, for use in later rules
    engine.addOperator('maxLength', (factValue, jsonValue) => {
        if (!factValue) return false

        return factValue.length < jsonValue
    })

    engine.addRule(rules)

    // hook up events
    engine
        .on('success', (event, almanac, ruleResult) => {
            successEvent(event, almanac, ruleResult)
        })
        .on('failure', (event, almanac, ruleResult) => {
            failEvent(event, almanac, ruleResult)
        })  
}

export {
    loadRulesEngine,
    engine,
}