'use strict'

const isNull = () => value => value === null || value === undefined
const isEmpty = () => value => isNull()(value) || value === ''
const isNotEmpty = () => value => !isEmpty()(value)

const isString = () => value => typeof value === 'string'
const isNotString = () => value => !isString()(value)

const isMin = (min = Number.MIN_SAFE_INTEGER) => value => value >= min
const isMax = (max = Number.MAX_SAFE_INTEGER) => value => value <= max

const isInteger = () => value => typeof value === 'number'

const isBoolean = () => value => typeof value === 'boolean'

const isObject = () => value => typeof value === 'object' && Object.keys(value).length > 0

const Required = constraints => [true].concat(constraints)

const Validator = schema => obj => {
    Object.keys(schema).forEach(key => {
        const constraints = [].concat(schema[key])
        const isRequired = constraints[0] === true
        const value = Object.keys(obj).find(k => k === key) && obj[key]
        const isValueNull = isNull()(value)

        if (isRequired && isValueNull) {
            throw new Error(`Required key="${key}" value="${value}" from schema!`)
        }

        if (isValueNull) {
            return
        }

        const validates = isRequired ? constraints.slice(1) : constraints
        validates.forEach(validate => {
            const isValid = validate(value)

            if (!isValid) {
                throw new Error(
                    `Invalid schema to key="${key}" from value="${value}" with validate Function: ${validate}!`
                )
            }
        })
    })
}

module.exports = {
    Validator,
    Required,
    isNull,
    isEmpty,
    isNotEmpty,
    isString,
    isNotString,
    isMin,
    isMax,
    isInteger,
    isBoolean,
    isObject,
}
