module.exports = {
    mode: 'production',
    output: {
        filename: 'index.js',
        sourceMapFilename: 'index.map',
        library: 'fvi-validator-js',
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
}
