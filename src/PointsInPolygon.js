import earcut from 'earcut';
import bresenham from 'bresenham';

class PointsInPolygon {
  process(polygon, callback) {
    let [vertices, holes] = this._preparePolygon(polygon);
    try {
      // console.log(vertices);
      // console.log(holes);
      var triangles = earcut(vertices, holes);
    } catch (e) {
      console.error(e);
      return null;
    }
    console.log(triangles);

    for (let i=0; i<triangles.length; i+=3) {
      let triangle = [0, 1, 2].map(j =>
        this._extractPoint(vertices, triangles[i+j])
      );
      this._pointsInTriangle(triangle, callback);
    }
  }

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

  _extractPoint(vertices, pointId) {
    return [vertices[pointId*2], vertices[pointId*2+1]];
  }

  _pointsInTriangle(triangle, callback) {
    let a = this._line(triangle[1], triangle[2]),
        b = this._line(triangle[0], triangle[2]),
        c = this._line(triangle[0], triangle[1]);

    let points = a.concat(b).concat(c)
    .sort((a, b) => a.y === b.y ? a.x-b.x : a.y-b.y);
    console.log(points);

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

  _line(from, to)  {
    return bresenham(from[0], from[1], to[0], to[1]);
  }
}

export default new PointsInPolygon();
