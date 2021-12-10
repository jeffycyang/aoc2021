const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const transformInput = (input) => input.map(e => e.split('').map(e => Number(e)));

const getSize = (x, y, map, store) => {
  if (map[x-1] && map[x-1][y] !== undefined && map[x-1][y] !== 9 && !store.includes(`${x-1}${y}`)) {
    store.push(`${x-1}${y}`)
    getSize(x-1, y, map, store);
  }
  if (map[x+1] && map[x+1][y] !== undefined && map[x+1][y] !== 9 && !store.includes(`${x+1}${y}`)) {
    store.push(`${x+1}${y}`)
    getSize(x+1, y, map, store);
  }
  if (map[x] && map[x][y-1] !== undefined && map[x][y-1] !== 9 && !store.includes(`${x}${y-1}`)) {
    store.push(`${x}${y-1}`)
    getSize(x, y-1, map, store);
  }
  if (map[x] && map[x][y+1] !== undefined && map[x][y+1] !== 9 && !store.includes(`${x}${y+1}`)) {
    store.push(`${x}${y+1}`)
    getSize(x, y+1, map, store);
  }
  return store;
}

const solve = (input) => {
  const heightMap = transformInput(input);

  const yLen = heightMap.length;
  const xLen = heightMap[0].length;

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
        lowPts.push([i,j]);
      }
    }
  }

  const basins = [];

  lowPts.forEach(point => {
    const [i,j] = point;

    const store = getSize(i,j, heightMap, [`${i},${j}`]);

    console.log('i,j,size', store.length);

    basins.push({ i, j, size: store.length-1 });
  });

  console.log(basins);

  basins.sort((a,b) => b.size - a.size);

  console.log('score', basins[0].size * basins[1].size * basins[2].size)
}

solve(advInput);

// solve([
//   '2199943210',
//   '3987894921',
//   '9856789892',
//   '8767896789',
//   '9899965678'
// ]);
