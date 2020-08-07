'use strict'

const chai = require('chai')

const app = require('../src')

const testIt = (e, containsMsg) => {
    chai.assert.exists(e)
    chai.assert.exists(e.message)
    chai.assert.exists(e.message.includes)
    try {
        chai.assert.isTrue(e.message.includes(containsMsg))
    } catch (error) {
        throw e
    }
}

describe('Testing Validator JS', () => {
    const constraintsOpts = {
        url: app.Required([app.isString(), app.isNotEmpty()]),
        server: app.Default('server-name-default', [app.isString(), app.isNotEmpty()]),
        timeout: [app.isInteger(), app.isMin(10)],
        delay: [app.isInteger(), app.isMin(10)],
        headers: [app.isObject()],
        mock: app.Default(false, [app.isBoolean()]),
        age: app.Default(10, [app.isInteger(), app.isMin(10)]),
    }
    let validate = null

    before(() => {
        validate = app.Validator(constraintsOpts)
    })

    it(`OK`, done => {
        const obj = { url: 'http://' }
        const other = validate(obj)
        chai.assert.exists(other.server)
        chai.assert.equal('server-name-default', other.server)
        chai.assert.exists(other.mock)
        chai.assert.equal(false, other.mock)
        chai.assert.exists(other.age)
        chai.assert.equal(10, other.age)
        done()
    })

    it('without config - FAIL', done => {
        try {
            validate({})
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('with config only timeout', done => {
        try {
            validate({ timeout: 1000 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('with config only delay', done => {
        try {
            validate({ delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('with config only timeout and delay', done => {
        try {
            validate({ timeout: 1000, delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('with config negative timeout ', done => {
        try {
            validate({ timeout: -10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('with config negative delay', done => {
        try {
            validate({ url: 'http://', timeout: 1000, delay: -10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"delay"')
            done()
        }
    })

    it('with config url=google.com, timeout and delay 0', done => {
        try {
            validate({ url: 'http://google.com', timeout: 1 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"timeout"')
            done()
        }
    })
})
