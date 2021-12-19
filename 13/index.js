const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  // const coords = input.slice();
  // const fold1 = coords.pop();
  // const fold2 = coords.pop();
  // coords.pop();

  const separatorInd = input.indexOf('');
  const coords = input.slice();
  coords.splice(separatorInd);
// console.log('coords', coords);

  let maxX, maxY;
  coords.forEach(coord => {
    const [x, y] = coord.split(',').map(e => Number(e));
    if (!maxX || maxX < x) maxX = x;
    if (!maxY || maxY < y) maxY = y;
  });
console.log('max', maxX, maxY);

  const board = [];
  for (let i = 0; i <= maxY; i++) {
    const row = []
    for (let j = 0; j <= maxX; j++) {
      row.push(0);
    }
    board.push(row);
  }
// console.log('board', board);

  coords.forEach(coord => {
    const [x, y] = coord.split(',').map(e => Number(e));
    board[y][x] = 1;
  });

// console.log('board', board);

  const separatorIndex = input.indexOf('');
  const folds = input.slice();
  folds.splice(0, separatorIndex + 1);
console.log('folds', folds);

  let firstFold;
  for (const i of Array(folds.length).keys()) {
    if (folds[i].split(' ')[2].split('=')[0] === 'x') {
      firstFold = folds[i];
      break;
    }
  }

console.log('firsty', firstFold);
  yFoldCoord = firstFold.split(' ')[2].split('=')[1];
console.log('yFoldCoord', yFoldCoord);

  if (firstFold.split(' ')[2].split('=')[0] === 'y') {
    const folded = board.slice(0, yFoldCoord);
  console.log('folded', folded.length);

    const bHalf = board.slice(Number(yFoldCoord) + 1).reverse();
  console.log('bHalf', bHalf.length);

    for (let i = 0; i < folded.length; i++) {
      for (let j = 0; j < folded[0].length; j++) {
        if (folded[i][j] === 0 && bHalf[i][j] === 1) folded[i][j] = 1;
      }
    }

    let dots = 0;
    for (let i = 0; i < folded.length; i++) {
      for (let j = 0; j < folded[0].length; j++) {
        dots += folded[i][j];
      }
    }
console.log('final', dots);
  }

  if (firstFold.split(' ')[2].split('=')[0] === 'x') {
    const folded = board.map(r => r.slice(0, yFoldCoord));

    const rHalf = board.map(r => r.slice(Number(yFoldCoord) + 1).reverse());

    for (let i = 0; i < folded.length; i++) {
      for (let j = 0; j < folded[0].length; j++) {
        if (folded[i][j] === 0 && rHalf[i][j] === 1) folded[i][j] = 1;
      }
    }

    let dots = 0;
    for (let i = 0; i < folded.length; i++) {
      for (let j = 0; j < folded[0].length; j++) {
        dots += folded[i][j];
      }
    }
console.log('final', dots);
  }
}

solve(advInput);

// solve([
//   '6,10',
//   '0,14',
//   '9,10',
//   '0,3',
//   '10,4',
//   '4,11',
//   '6,0',
//   '6,12',
//   '4,1',
//   '0,13',
//   '10,12',
//   '3,4',
//   '3,0',
//   '8,4',
//   '1,10',
//   '2,14',
//   '8,10',
//   '9,0',
//   '',
//   'fold along y=7',
//   'fold along x=5'
// ]);
