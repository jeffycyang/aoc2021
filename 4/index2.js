const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const getLosingBoard = input => {
  const seq = input
    .shift()
    .split(',');

  // console.log('input', input);

  const boards = [];

  for (let i = 0; i < input.length; i = i + 6) {
    const board = []
    for (let j = i + 1; j < i + 6; j++) {
      board.push(input[j]);
    }
    boards.push(board);
  }

  const numOfBoards = boards.length;
  const solvedBoardInds = [];

  console.log('BOARDS', boards);
  for (let i = 0; i < seq.length; i++) {
    let solvableBoard;

    boards.forEach((board, ind) => {
      if (!solvedBoardInds.includes(ind)) {
        const solvable = isBoardSolvable(board, seq.slice(0,i+1));
        if (solvable) solvedBoardInds.push(ind);
      }
    });

    if (solvedBoardInds.length === numOfBoards) {
      const losingBoard = boards[solvedBoardInds.pop()];
      const score = calculateScore(losingBoard, seq.slice(0,i+1));
      const finalScore = score * Number(seq[i]);
      console.log('final', finalScore);
      return finalScore;
    }
  }
}

const isBoardSolvable = (board, marks) => {
  // check rows
  for (let i = 0; i < 5; i++) {
    const row = board[i].trim().split(/\s+/);
    // console.log('row', row);
    if (row.every(e => marks.includes(e))) return true;
  }

  // check columns
  for (let i = 0; i < 5; i++) {
    const col = [0,1,2,3,4]
      .map(e => board[e].trim().split(/\s+/)[i]);
    // console.log('col', col);
    if (col.every(e => marks.includes(e))) return true;
  }

  return false;
}

const calculateScore = (board, marks) => {
  const boardArr = board.reduce((acc, curr) => acc.concat(curr.trim().split(/\s+/)), []);
  console.log('ba', boardArr);
  const unMarked = boardArr.filter(e => !marks.includes(e));
  console.log('un', unMarked);
  const sum = unMarked.reduce((acc, curr) => acc += Number(curr), 0);
  return sum;
}

getLosingBoard(advInput);

// getLosingBoard([
// '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
// '',
// '22 13 17 11  0',
// ' 8  2 23  4 24',
// '21  9 14 16  7',
// ' 6 10  3 18  5',
// ' 1 12 20 15 19',
// '',
// ' 3 15  0  2 22',
// ' 9 18 13 17  5',
// '19  8  7 25 23',
// '20 11 10 24  4',
// '14 21 16 12  6',
// '',
// '14 21 17 24  4',
// '10 16 15  9 19',
// '18  8 23 26 20',
// '22 11 13  6  5',
// ' 2  0 12  3  7',
// ]);
