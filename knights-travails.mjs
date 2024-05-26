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

function search(node, targetRow, targetCol) {
	// Breath First Search algorithm

	let queue = new Queue();
	let visited = new Set();

	// Initialize queue with the starting node
	queue.enqueue(node);
	visited.add(node);

	// Perform BFS
	while (!queue.isEmpty()) {
		let currentNode = queue.dequeue();

		// Check if target is found
		if (currentNode.row === targetRow && currentNode.column === targetCol) {
			// Reconstruct and return the path
			return constructPath(currentNode);
		}

		// Enqueue neighbors
		currentNode.edges.forEach((neighbor) => {
			if (!visited.has(neighbor.connectedNode)) {
				queue.enqueue(neighbor.connectedNode);
				visited.add(neighbor.connectedNode);
				neighbor.connectedNode.parent = currentNode;
			}
		});
	}

	// If target is not reachable
	return null;
}

function constructPath(targetNode) {
	let path = [];
	let currentNode = targetNode;

	// Traverse back from target to start
	while (currentNode !== undefined) {
		path.push([currentNode.row, currentNode.column]);
		currentNode = currentNode.parent;
	}

	// Reverse the path to get it in the correct order
	return path.reverse();
}

function knightMoves(initialCoordinates = [0, 0], targetCoordinates = [7, 7]) {
	let path = search(
		board[initialCoordinates[0]][initialCoordinates[1]],
		targetCoordinates[0],
		targetCoordinates[1]
	);
	console.log(`Target reached in ${path.length - 1} moves!\nPath:`);
	path.forEach((position) => {
		console.log(`[${position[0]}, ${position[1]}]`);
	});
}

// Execution starts here:
// Generate board & graph
const board = generateBoard();
linkNodes(board);

// Search
knightMoves([3, 3], [4, 3]);
