const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  console.log('input', input);
  let formatted = input[0].split(',').map(e => Number(e));
// console.log('formatted', formatted);
  const bucket = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  };

  formatted.forEach(e => bucket[e]++);
  console.log('bucketInit', bucket);

  for (let i = 0; i < 256; i++) {
    const born = bucket[0];
    for (let j = 0; j < 8; j++) {
      bucket[j] = bucket[j+1]
    }

    bucket[6] += born;
    bucket[8] = born;
  }
  console.log('bucketFin', bucket);
  console.log('length', Object.values(bucket).reduce((acc, curr) => acc += curr, 0));
}

solve(advInput);

// solve(['3,4,3,1,2']);
