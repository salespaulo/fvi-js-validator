'use strict'

const isNull = () => value => value === null || value === undefined
const isNotNull = () => value => !isNull()(value)

const isEmpty = () => value => isNull()(value) || value === ''
const isNotEmpty = () => value => !isEmpty()(value)

const isString = () => value => typeof value === 'string'
const isNotString = () => value => !isString()(value)

const isMin = (min = Number.MIN_SAFE_INTEGER) => value => value >= min
const isMax = (max = Number.MAX_SAFE_INTEGER) => value => value <= max

const isNumber = () => value => typeof value === 'number'

const isBoolean = () => value => typeof value === 'boolean'

const isObject = () => value => typeof value === 'object' && Object.keys(value).length > 0

const Required = constraints => ['required'].concat(constraints)

const Default = (defaultValue, constraints) => ['default', defaultValue].concat(constraints)

const Validator = schema => obj =>
    Object.keys(schema).reduce((validObj, key) => {
        if (Object.keys(validObj).length === 0) {
            validObj = {}
            Object.assign(validObj, obj)
        }

        let value = Object.keys(obj).find(k => k === key) && obj[key]

        const constraints = [].concat(schema[key])

        const isRequired = constraints[0] === 'required'
        const isDefault = constraints[0] === 'default'
        const isValueNull = isNull()(value)

        if (isRequired && isValueNull) {
            throw new Error(`Required key="${key}" value="${value}" from schema!`)
        }

        if (isDefault && isValueNull) {
            value = constraints[1]
            validObj[key] = value
        } else if (isValueNull) {
            return validObj // not required
        }

        const validates = isRequired
            ? constraints.slice(1)
            : isDefault
            ? constraints.slice(2)
            : constraints

        validates.forEach(validate => {
            const isValid = validate(value)

            if (!isValid) {
                throw new Error(
                    `Invalid schema to key="${key}" from value="${value}" with validate Function: (${validate}) !`
                )
            }
        })

        return validObj
    }, {})

module.exports = {
    Validator,
    Required,
    Default,
    isNull,
    isNotNull,
    isEmpty,
    isNotEmpty,
    isString,
    isNotString,
    isMin,
    isMax,
    isInteger: isNumber,
    isBoolean,
    isObject,
}
