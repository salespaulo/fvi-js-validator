## FVI - Vaolidator JS

### How to use

```javascript
const { Validator, Required, isString, isNotEmpty, isInteger, isMin } = require('fvi-js-validator')

const validate = Validator({
    id: Required([isString(), isNotEmpty()]),
    age: Required([isInteger(), isMin(18)]),
    name: [isString()],
})

try {
    validate({ id: '1234', age: 10 })
} catch (e) {
    console.error(e)
}
```

### fvi-js-validator - npm scripts

-   `npm run compile`: Clean temp files and e directories.
-   `npm run debug-test`: Run mocha unit tests with DEBUG enabled.
-   `npm run test`: Run mocha unit tests.
-   `npm run debug-dev`: Run dev mode, waiting for changes to run unit tests with DEBUG enabled (watch mode).
-   `npm run dev`: Run dev mode, waiting for changes to run unit tests.
-   `npm run prod`: Run with NODE_ENV=production.
-   `npm run coverage`: Run unit tests and coverage with [nyc](https://github.com/istanbuljs/nyc/).
-   `npm run release`: Init git flow release from next package version, **patch**, [git flow](https://github.com/nvie/gitflow/).
-   `npm run release:minor`: Init git flow release from next package version, **minor**, [git flow](https://github.com/nvie/gitflow/).
-   `npm run release:major`: Init git flow release from next package version, **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finish current releas, [git flow](https://github.com/nvie/gitflow/).
