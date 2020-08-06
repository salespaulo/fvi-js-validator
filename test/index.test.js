'use strict'

const chai = require('chai')

const app = require('../src')

const testIt = (e, containsMsg) => {
    chai.assert.exists(e)
    chai.assert.exists(e.message)
    chai.assert.exists(e.message.includes)
    chai.assert.isTrue(e.message.includes(containsMsg))
}

describe('Testing Validator JS', () => {
    const constraintsOpts = {
        url: app.Required([app.isString(), app.isNotEmpty()]),
        timeout: [app.isInteger(), app.isMin(10)],
        delay: [app.isInteger(), app.isMin(10)],
        headers: [app.isObject()],
        mock: [app.isBoolean()],
    }
    let validate = null

    before(() => {
        validate = app.Validator(constraintsOpts)
    })

    it('Init without config - FAIL', done => {
        try {
            validate({})
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('Init with config only timeout', done => {
        try {
            validate({ timeout: 1000 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('Init with config only delay', done => {
        try {
            validate({ delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('Init with config only timeout and delay', done => {
        try {
            validate({ timeout: 1000, delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('Init with config negative timeout ', done => {
        try {
            validate({ timeout: -10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"url"')
            done()
        }
    })

    it('Init with config negative delay', done => {
        try {
            validate({ url: 'http://', timeout: 1000, delay: -10 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"delay"')
            done()
        }
    })

    it('Init with config url=google.com, timeout and delay 0', done => {
        try {
            validate({ url: 'http://google.com', timeout: 1 })
            done('Should be thorws error!')
        } catch (e) {
            testIt(e, '"timeout"')
            done()
        }
    })
})
