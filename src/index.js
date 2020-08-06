'use strict'

const doValidate = (schema, value) => {
    const validates = [].concat(schema.validates)
    validates.forEach(validate => {
        const fromValue = schema.key ? (value[schema.key] ? value[schema.key] : null) : value
        const isValid = validate(fromValue)
        if (!isValid) {
            throw new Error(
                `Invalid Schema key="${schema.key}" to value="${fromValue}" with Function: ${validate}!`
            )
        }
    })
}

exports.isNull = value => value === null || value === undefined
exports.isEmpty = value => isNull(value) || value === ''
exports.isNotEmpty = value => !isEmpty(value)

exports.isString = value => typeof value === 'string'
exports.isNotString = value => !isString(value)

exports.isInteger = (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => value =>
    typeof value === 'number' && min >= min && value <= max
exports.isNotInteger = (min, max) => value => !isNumber(min, max)(value)

exports.isBoolean = value => typeof value === 'boolean'
exports.isNotBoolean = value => !isBoolean(value)

exports.isObject = value => typeof value === 'object' && Object.keys(value).length > 0
exports.isNotObject = value => !isObject(value)

exports.isOptional = (key, constraints) => value => isNull(value) || isNull(value[key]) || doValidate({ key, validates: constraints }, value)

exports.Validator = constraints => value => {
    Object.keys(constraints)
        .map(key => ({ key, validates: constraints[key] }))
        .forEach(schema => doValidate(schema, value))
}
