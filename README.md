# points-in-polygon

A node.js library helping you to process and rasterize all points in any given 2D polygon.

## How does it work?

* Triangulation is done with [earcut](https://github.com/mapbox/earcut)
* Triangle sides are determined using [bresenham](https://github.com/madbence/node-bresenham)
* All points in each triangle are iterated and passed to the callback.

## How to install

Install it into your project with
```
npm install --save points-in-polygon
```

## How to use it

```js
const pointsInPolygon = require('points-in-polygon');

let polygon = [
  // first element is defining the outer area of the polygon
  [{x: 0, y: 0}, {x: 10, y: 0}, {x: 10, y: 10}, {x: 0, y: 10}],
  // following elements will define the inner cut out areas
  [{x: 3, y: 3}, {x: 6, y: 3}, {x: 6, y: 6}, {x: 3, y: 6}],
  ...
];
// triangulate, rasterize and calculate points inside the polygon
pointsInPolygon.process(polygon, (x, y) => console.log(x, y));
```

## License
#### The MIT License (MIT)
Copyright (c) 2017 Michael Straßburger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
