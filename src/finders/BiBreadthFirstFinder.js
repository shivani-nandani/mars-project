var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Breadth-First-Search path finder.
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */

 function backtrace(node) {
     var path = [[node.x, node.y]];
     while (node.parent) {
         node = node.parent;
         path.push([node.x, node.y]);
     }
     return path.reverse();
 }

function BiBreadthFirstFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */

 BiBreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var startQueue = [],
        endQueue = [],
        diagonalMovement = this.diagonalMovement;
        startNode = grid.getNodeAt(startX, startY);
        endNode = grid.getNodeAt(endX, endY);
        neighbors_s, neighbors_e, node_s, node_e, i, current_s, current_e;

    startQueue.push(startNode);
    startNode.visited = true;

    endQueue.push(endNode);
    endNode.visited = true;

    while (startQueue.length && endQueue.length) {
        node_s = startQueue.shift();
        node_s.visited = true;

        if(node_s === node_e) {
            backtrace(node_e);
            backtrace(node_s.parent);
            break;
        }

        neighbors_s = grid.getNeighbors(node_s, diagonalMovement);
        neighbors_e = grid.getNeighbors(node_e, diagonalMovement);
        for(i = 0, j = 0; i < neighbors_s.length, j < neighbors_e.length; i++, j++) {
            current_s = neighbors_s[i];
            current_e = neighbors_e[j];

            if (!current_s.visited) {
              startQueue.push(current_s);
              current_s.visited = true;
              current_s.parent = node_s;
            }

            if (!current_e.visited) {
              endQueue.push(current_e);
              current_e.visited = true;
              current_e.parent = node_e;
            }
        }
    }
}

module.exports = BreadthFirstFinder;
