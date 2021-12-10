const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const formattedInput = input.map(e => e.split(' -> ').map(e => e.split(',').map(e => Number(e))));

  const vertAndHori = formattedInput.filter(e => e[0][0] === e[1][0] || e[0][1] === e[1][1]);

  let maxX = 0;
  let maxY = 0;

  vertAndHori.forEach(line => {
    const [ p1, p2 ] = line;
    if (p1[0] > maxX) maxX = p1[0];
    if (p2[0] > maxX) maxX = p2[0];
    if (p1[1] > maxY) maxY = p1[1];
    if (p2[1] > maxY) maxY = p2[1];
  });

  const board = [];
  for (let i = 0; i <= maxY; i++) {
    board.push([]);
    for (let j = 0; j <= maxX; j++) {
      board[i].push(0);
    }
  }

  vertAndHori.forEach(line => {
    const [ p1, p2 ] = line;
    const isHori = p1[0] === p2[0];

    let min = 0;
    let max = 0;
    if (isHori) {
      if (p1[1] > p2[1]) {
        min = p2[1];
        max = p1[1];
      } else {
        min = p1[1];
        max = p2[1];
      }
      for (let i = min; i <= max; i++) {
        board[p1[0]][i]++;
      }
    } else {
      if (p1[0] > p2[0]) {
        min = p2[0];
        max = p1[0];
      } else {
        min = p1[0];
        max = p2[0];
      }
      for (let i = min; i <= max; i++) {
        board[i][p1[1]]++;
      }
    }
  });

  console.log('Board', board);

  let points = 0;
  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      if (board[i][j] > 1) points++;
    }
  }

  console.log('Points', points);

  return points;
}

solve(advInput);

// solve([
// '0,9 -> 5,9',
// '8,0 -> 0,8',
// '9,4 -> 3,4',
// '2,2 -> 2,1',
// '7,0 -> 7,4',
// '6,4 -> 2,0',
// '0,9 -> 2,9',
// '3,4 -> 1,4',
// '0,0 -> 8,8',
// '5,5 -> 8,2'
// ]);
