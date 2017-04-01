// Manually setup beautiful babel to transpile some ES6/7 features
require('babel-register')({
  presets: ['es2015'],
  plugins: ['transform-object-rest-spread']
});
module.exports = require(__dirname+'/src/PointsInPolygon.js').default;
