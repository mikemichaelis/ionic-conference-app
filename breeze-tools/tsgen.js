var tsGen = require('./tsgen-core');

tsGen.generate({
    inputFileName: './src/assets/metadata/metadata.json',
    outputFolder: './src/app/core/entities',
    camelCase: false,
    kebabCaseFileNames: true,
    baseClassName: 'EntityBase'
});