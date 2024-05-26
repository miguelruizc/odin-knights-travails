import {Node} from './knights-travails.mjs';

export function generateBoard() {
    const ROWS = 8;
    const COLUMNS = 8;
    let board = [];

    for(let i = 0; i < ROWS; i++) {
        
        board[i] = [];
        for(let j = 0; j < COLUMNS; j++){
            board[i][j] = new Node(i, j);
        }
    }

    return board;
}

export function printBoard(board) {
    let copy = [...board].reverse();
    copy.forEach(row => {
    
        let string = '';
        
        row.forEach(cell => {
            string += cell.toString();
        })
        
        console.log(string);
    })
}

export function linkNodes(board) {
    board.forEach(row => {
        row.forEach(column => {
            column.edges.forEach(edge => {
                //Assign node key, with the corresponding node in the board
                edge.connectedNode = board[edge.row][edge.column];
            })
        })
    })
}

export class Queue {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
	}

	dequeue() {
		if (this.items.length === 0) {
			return null;
		}
		return this.items.shift();
	}

	isEmpty() {
		if (this.items.length === 0) return true;
		return false;
	}
}
