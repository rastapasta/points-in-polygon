const pointsInPolygon = require('../');

pointsInPolygon.process([
  [
    {x: 0, y:0},
    {x: 3, y:0},
    {x: 3, y:3},
    {x: 0, y:3}
  ]
], (x, y) => console.log(x, y));
