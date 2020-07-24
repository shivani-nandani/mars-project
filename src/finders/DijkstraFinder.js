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

function DijkstraFinder(opt) {
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

 DijkstraFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
   var list = [],
       diagonalMovement = this.diagonalMovement;
       startNode = grid.getNodeAt(startX, startY);
       endNode = grid.getNodeAt(endX, endY);
       neighbors, node, i, current, weight, min = 0;

   list.push(startNode);
   startNode.visited = true;

   while (queue.length) {
       node = queue.pop();
       node.visited = true;

       if(node === endNode) {
           return backtrace(endNode);
       }

       neighbors = grid.getNeighbors(node, diagonalMovement);
       for(i = 0; i < neighbors.length; i++) {
           current = neighbors[i];

           if (current.visited) {
               continue;
           }
           weight = ((endX - current.x)*(endX - current.x) +((endY - current.x)*(endY - current.x)
           if(weight <= min) {
              list.push(current);
            }
           current.visited = true;
           current.parent = node;

       }
   }
}

module.exports = DijkstraFinder;
