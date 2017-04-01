const pointsInPolygon = require('../');

pointsInPolygon.process([
  [
    {x: 0, y:0},
    {x: 10, y:0},
    {x: 10, y:10},
    {x: 0, y:10}
  ],
  [
    {x: 2, y:2},
    {x: 8, y:2},
    {x: 8, y:8},
    {x: 2, y:8}
  ],
], (x, y) => console.log(x, y));
