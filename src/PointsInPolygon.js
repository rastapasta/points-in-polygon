import earcut from 'earcut';
import bresenham from 'bresenham';

class PointsInPolygon {
  // Process a given polygon and call the callback for each point in it
  // Format: [[{x,y},...],[{x,y},...],[{x,y},...]]
  process(polygon, callback) {
    // Prepare the given polygon points
    let [vertices, holes] = this._preparePolygon(polygon);

    // Triangulate the polygon
    try {
      var triangles = earcut(vertices, holes);
    } catch (e) {
      console.error(e);
      return null;
    }

    // Process each resulting triangle
    for (let i=0; i<triangles.length; i+=3) {
      let triangle = [0, 1, 2].map(j => this._extractPoint(vertices, triangles[i+j]));
      this._pointsInTriangle(triangle, callback);
    }
  }

  // Converts given [[{outerX,outerY},...],[{innerX,innerY},...],[{innerX, innerY},...]]
  // polygon input into the input format which earcut expects to receive
  _preparePolygon(polygon) {
    let vertices = [],
        holes = [];

    polygon.every(ring => {
      // Invalid inner polygons are currently gracefully ignored
      // while the outer polygon must be valid

      if (vertices.length) {
        if (ring.length < 3) {
          return true;
        }
        holes.push(vertices.length/2);
      } else if (ring.length < 3) {
        return false;
      }

      ring.forEach(point => vertices.push(point.x, point.y));
      return true;
    });

    return [vertices, holes];
  }

  // Extracts the corresponding points of the given vertices' point
  _extractPoint(vertices, pointId) {
    return [vertices[pointId*2], vertices[pointId*2+1]];
  }

  // Inspired by section III of
  // http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
  _pointsInTriangle(triangle, callback) {
    // Get all points on the triangles' sides ...
    let points = [].concat(
      this._line(triangle[1], triangle[2]),
      this._line(triangle[0], triangle[2]),
      this._line(triangle[0], triangle[1])
    )
    // ... and sort them by y, x
    .sort((a, b) => a.y === b.y ? a.x-b.x : a.y-b.y);

    // To finally iterate over the space between each point
    points.forEach((point, i) => {
      let next = points[i+1];
      if (next && point.y === next.y) {
        for(let x=point.x; x<next.x; x++) {
          callback(x, point.y);
        }
      } else {
        callback(point.x, point.y);
      }
    });
  }

  // Returns all points on a given line
  _line(from, to)  {
    return bresenham(from[0], from[1], to[0], to[1]);
  }
}

export default new PointsInPolygon();
