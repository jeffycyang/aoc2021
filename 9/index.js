const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const transformInput = (input) => input.map(e => e.split('').map(e => Number(e)));

const solve = (input) => {
  const heightMap = transformInput(input);

  const yLen = heightMap.length;
  const xLen = heightMap[0].length;
console.log('heightMap', heightMap);
console.log('xy', xLen, yLen);
  const lowPts = [];

  for (let i = 0; i < yLen; i++) {
    for (let j = 0; j < xLen; j++) {
      const val = heightMap[i][j];

      if (
        ((!heightMap[i-1] || heightMap[i-1][j] === undefined) || heightMap[i-1][j] > val) &&
        ((!heightMap[i+1] || heightMap[i+1][j] === undefined) || heightMap[i+1][j] > val) &&
        ((!heightMap[i] || heightMap[i][j-1] === undefined) || heightMap[i][j-1] > val) &&
        ((!heightMap[i] || heightMap[i][j+1] === undefined) || heightMap[i][j+1] > val)
      ) {
        console.log('i,j', i, j)
        console.log('val', val)
        lowPts.push(val);
      }
    }
  }

  console.log(lowPts.length);

  const score = lowPts.reduce((acc, curr) => acc += curr + 1, 0);

  console.log(score);
}

solve(advInput);

// solve([
//   '2199943210',
//   '3987894921',
//   '9856789892',
//   '8767896789',
//   '9899965678'
// ]);
