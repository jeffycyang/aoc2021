const fs = require('fs');

const advInput = fs.readFileSync('./input.txt').toString().split('\n').map(e => Number(e));

const getDepthIncreaseCount = input => {
  let count = 0;

  let prev = null;
  for (let i = 0; i < input.length; i++) {
    if (i == 0) {
      prev = input[i];
      continue;
    } else {
      if (input[i] > prev) count++;
      prev = input[i];
    }
  }

  return count;
};

const advOutput = getDepthIncreaseCount(advInput);

console.log('count', advOutput);
