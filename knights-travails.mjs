/*
    Assignment: 
    For each position, find the shortest path to another position as a chess knight

    -8x8 array of positions/board
    -Each position is a graph node that directs to several legal positions

    Pseudocode: 
    BUILD GRAPH:
    -Iterate all board positions (and for each):
        -compute valid moves, store as a graph
    SEARCH SHORTEST PATH:
    -Given 2 nodes, use a BFS algorithm to find shortest possible path
*/
import { generateBoard, printBoard, linkNodes, Queue } from './utils.mjs';

export class Node {
	constructor(row, column) {
		this.row = row;
		this.column = column;
		this.edges = [];
		this.computeEdges();
	}

	toString() {
		return `(${this.row},${this.column})`;
	}

	computeEdges() {
		// Check each possible move, if is valid, store edge
		// move 1: row+1 col-2
		if (this.row + 1 <= 7 && this.column - 2 >= 0)
			this.edges.push({ row: this.row + 1, column: this.column - 2 });
		// move 2: row+2 col-1
		if (this.row + 2 <= 7 && this.column - 1 >= 0)
			this.edges.push({ row: this.row + 2, column: this.column - 1 });
		// move 3: row+2 col+1
		if (this.row + 2 <= 7 && this.column + 1 <= 7)
			this.edges.push({ row: this.row + 2, column: this.column + 1 });
		// move 4: row+1 col+2
		if (this.row + 1 <= 7 && this.column + 2 <= 7)
			this.edges.push({ row: this.row + 1, column: this.column + 2 });
		// move 5: row-1 col+2
		if (this.row - 1 >= 0 && this.column + 2 <= 7)
			this.edges.push({ row: this.row - 1, column: this.column + 2 });
		// move 6: row-2 col+1
		if (this.row - 2 >= 0 && this.column + 1 <= 7)
			this.edges.push({ row: this.row - 2, column: this.column + 1 });
		// move 7: row-2 col-1
		if (this.row - 2 >= 0 && this.column - 1 >= 0)
			this.edges.push({ row: this.row - 2, column: this.column - 1 });
		// move 8: row-1 col-2
		if (this.row - 1 >= 0 && this.column - 2 >= 0)
			this.edges.push({ row: this.row - 1, column: this.column - 2 });
	}
}

function search(node, targetRow, targetCol, queue = new Queue()) {
	// Breath First Search algorithm

	// Enqueue neighbors
	let neighbors = node.edges;
	if (neighbors) {
		neighbors.forEach((neighbor) => {
			queue.enqueue(neighbor.connectedNode);
		});
	}

	// Visit current node
	// Case base: Element found
	if (node.row === targetRow && node.column === targetCol) {
		console.log('FOUND!');
		console.log(node);
		return;
	}

	// recursively
	// -search next neighbor in queue
	let nextNode = queue.dequeue();
	return search(nextNode, targetRow, targetCol, queue);
}

// Execution starts here:
// Generate board & graph
const board = generateBoard();
linkNodes(board);
printBoard(board);

// Search
search(board[0][0], 7, 6);

