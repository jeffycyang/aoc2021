const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const map = input.map(r => r.split('').map(e => Number(e)));
console.log('map', map);

  const lenI = map.length - 1;
  const lenJ = map[0].length - 1;
console.log('limits', lenI, lenJ);

  // const risk = { min: Infinity };

  const memo = [];
  for (const i of Array(lenI+1).keys()) {
    memo[i] = [];
    for (const j of Array(lenJ+1).keys()) {
      memo[i][j] = Infinity;
    }
  }
// console.log('memo', memo);

  // recurse(0, 0, lenI, lenJ, map, memo);
  // console.log('risk', memo);

  memo[0][0] = map[0][0];

  const risk = recurseNEW(lenI, lenJ, map, memo);
// console.log('memo', memo);
console.log('risk', risk);
}

const recurseNEW = (i, j, map, memo) => {
  if (i === 0 & j === 0) return memo[i][j];

  // if (memo[i][j] < Infinity) return memo[i][j];

  if (i-1 >= 0 && memo[i][j] >= map[i][j] + memo[i-1][j]) {
    memo[i][j] = map[i][j] + recurseNEW(i-1, j, map, memo);
    // return memo[i][j];
  }

  if (j-1 >= 0 && memo[i][j] >= map[i][j] + memo[i][j-1]) {
    memo[i][j] = map[i][j] + recurseNEW(i, j-1, map, memo);
    // return memo[i][j];
  }

console.log('m?', memo[i][j]);
  return memo[i][j];
}

const recurse = (i, j, lI, lJ, map, memo) => {
  if (i === 0 && j === 0) memo[i][j] = map[i][j];

  if (i-1 >= 0 && memo[i][j] > memo[i-1][j] + map[i][j]) memo[i][j] = memo[i-1][j] + map[i][j];
  if (j-1 >= 0 && memo[i][j] > memo[i][j-1] + map[i][j]) memo[i][j] = memo[i][j-1] + map[i][j];

  if (i < lI && j < lJ) {
    if (i+1 <= lI) recurse(i+1, j, lI, lJ, map, memo);
    if (j+1 <= lJ) recurse(i, j+1, lI, lJ, map, memo);
  }



  // if (i === lI && j === lJ) {
  //   nav.push(`${i},${j}`);

  //   const currRisk = nav.reduce((acc, curr) => {
  //     const [i, j] = curr.split(',').map(e => Number(e));
  //     return acc + map[i][j];
  //   }, 0);

  //   // console.log('nav', nav);
  //   console.log('currRisk', currRisk);

  //   if (currRisk < risk.min) risk.min = currRisk;

  //   return;
  // }

  // if (!nav.includes(`${i},${j}`)) {
  //   const newNav = nav.slice();
  //   newNav.push(`${i},${j}`);

  //   if (i+1 <= lI) recurse(i+1, j, lI, lJ, newNav, risk, map);
  //   // if (i-1 >= 0) recurse(i-1, j, lI, lJ, newNav, risk, map);
  //   if (j+1 <= lJ) recurse(i, j+1, lI, lJ, newNav, risk, map);
  //   // if (j-1 >= 0) recurse(i, j-1, lI, lJ, newNav, risk, map);
  // }
}

// solve(advInput);

solve([
  '1163751742',
  '1381373672',
  '2136511328',
  '3694931569',
  '7463417111',
  '1319128137',
  '1359912421',
  '3125421639',
  '1293138521',
  '2311944581'
]);
