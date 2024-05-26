/*
Assignment: 
For each positon, find the shortest path to another position as a chess knight

-8x8 array of positions/board
-Each position is a graph node that directs to several legal positions

Pseudocode: 
BUILD GRAPH:
-Iterate all board positions (and for each):
    -compute valid moves, store as a graph
SEARCH SHORTEST PATH:
-Given 2 nodes, use an algorithm to find shortest posible path
*/
class Node {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.edges = [];
    }

    toString(){
        return `(${this.row},${this.column})`;
    }

    computeEdges(){
        // Check each posible move, if is valid, store edge
        // move 1
        // move 2
        // move 3
        // move 4
        // move 5 
        // move 6
        // move 7
        // move 8
    }
}

function generateBoard() {
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

function printBoard(board) {
    board.forEach(row => {
    
        let string = '';
        
        row.forEach(cell => {
            string += cell.toString();
        })
        
        console.log(string);
    })
}

const board = generateBoard();
printBoard(board);



