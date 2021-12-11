const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  let board = input.map(row => row.split('').map(e => Number(e)));

  console.log('board', board);

  let flash = 0;
  let stepA = 0;
  while (!board.every(r => r.every(e => e === 0))) {
    stepA++;
    flash += step(board);
    board.forEach(r => {
      r.forEach((e, ind) => {
        if (r[ind] === 10) {
          r[ind] = 0;
        }
      })
    });
    if (board.every(r => r.every(e => e === 0))) {
      console.log('board', board);
      break;
    }
  }

  console.log('step', stepA);

  console.log('flash', flash);
};

const step = (board) => {
  const xL = board.length;
  const yL = board[0].length;
  for (let i of Array(xL).keys()) {
    for (let j of Array(yL).keys()) {
      board[i][j]++;
    }
  }

  const nav = [];
  const flash = recurse(board, 0, nav);

  return flash;
};

const recurse = (board, flash, nav) => {
  const xL = board.length;
  const yL = board[0].length;
  for (let i of Array(xL).keys()) {
    for (let j of Array(yL).keys()) {
      if (board[i][j] === 10 && !nav.includes(`${i},${j}`)) {
        flash++;
        nav.push(`${i},${j}`);
        if (board[i-1] !== undefined && board[i-1][j] !== undefined && board[i-1][j] < 10) board[i-1][j]++;
        if (board[i+1] !== undefined && board[i+1][j] !== undefined && board[i+1][j] < 10) board[i+1][j]++;
        if (board[i] !== undefined && board[i][j-1] !== undefined && board[i][j-1] < 10) board[i][j-1]++;
        if (board[i] !== undefined && board[i][j+1] !== undefined && board[i][j+1] < 10) board[i][j+1]++;
        if (board[i-1] !== undefined && board[i-1][j-1] !== undefined && board[i-1][j-1] < 10) board[i-1][j-1]++;
        if (board[i-1] !== undefined && board[i-1][j+1] !== undefined && board[i-1][j+1] < 10) board[i-1][j+1]++;
        if (board[i+1] !== undefined && board[i+1][j-1] !== undefined && board[i+1][j-1] < 10) board[i+1][j-1]++;
        if (board[i+1] !== undefined && board[i+1][j+1] !== undefined && board[i+1][j+1] < 10) board[i+1][j+1]++;
        flash += recurse(board, 0, nav);
      }
    }
  }
  return flash;
}

solve(advInput);

// solve([
//   '5483143223',
//   '2745854711',
//   '5264556173',
//   '6141336146',
//   '6357385478',
//   '4167524645',
//   '2176841721',
//   '6882881134',
//   '4846848554',
//   '5283751526'
// ]);

// solve([
// '11111',
// '19991',
// '19191',
// '19991',
// '11111'
// ]);
