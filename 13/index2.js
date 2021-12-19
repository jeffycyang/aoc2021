const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
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

  let fBoard = board.slice();
  folds.forEach(fold => {
    const foldX = fold.split(' ')[2].split('=')[0] === 'x';
    const foldCoord = fold.split(' ')[2].split('=')[1];

    if (foldX) {
      const folded = fBoard.map(r => r.slice(0, foldCoord));

      const rHalf = fBoard.map(r => r.slice(Number(foldCoord) + 1).reverse());

      for (let i = 0; i < folded.length; i++) {
        for (let j = 0; j < folded[0].length; j++) {
          if (folded[i][j] === 0 && rHalf[i][j] === 1) folded[i][j] = 1;
        }
      }

      fBoard = folded;
    } else {
      const folded = fBoard.slice(0, foldCoord);

      const bHalf = fBoard.slice(Number(foldCoord) + 1).reverse();

      for (let i = 0; i < folded.length; i++) {
        for (let j = 0; j < folded[0].length; j++) {
          if (folded[i][j] === 0 && bHalf[i][j] === 1) folded[i][j] = 1;
        }
      }

      fBoard = folded;
    }
  });

  // console.log('fBoard\n', fBoard);
  console.log('code:\n', fBoard
    .map(r => r.map(e => {
      if (e === 0) return '.'
      if (e === 1) return '#'
    }))
    .reduce((acc, curr) => {
      curr.toString();
      acc = `${acc}${curr}\n`;
      return acc;
    }, ''));
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
