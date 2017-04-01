// Manually setup beautiful babel to transpile some ES6/7 features
const pointsInPolygon = new (require(__dirname+'/src/PointsInPolygon.js'))();
module.exports = pointsInPolygon.process.bind(pointsInPolygon);
