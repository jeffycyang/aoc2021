const fs = require('fs');

const getWindowDepthIncreaseCount = input => {
  let count = 0;

  for (let i = 3; i < input.length; i++) {
    const prev = input[i-3] + input[i-2] + input[i-1];
    const curr = input[i-2] + input[i-1] + input[i];
    if (curr > prev) count++;
  }

  return count;
};

const advInput = fs.readFileSync('./input.txt').toString().split('\n').map(e => Number(e));

const advOutput = getWindowDepthIncreaseCount(advInput);

console.log('count', advOutput); // 1575
