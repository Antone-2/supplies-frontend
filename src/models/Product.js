// CommonJS bridge to TypeScript Product model
const productModel = require('./Product.ts').default || require('./Product.ts').productModel;
module.exports = productModel;