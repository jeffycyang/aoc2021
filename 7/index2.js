const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const nums = input[0].split(',').map(e => Number(e));
  const min = Math.min(...nums);
  const max = Math.max(...nums);
console.log('NUM', nums, min, max);

  let val;
  let pos;

  for (let i = min; i <= max; i++) {
    if (!val && !pos) {
      val = nums.reduce((acc, curr) => {
        const steps = Math.abs(i - curr);
        let x = 0;
        for (let i = 1; i <= steps; i++) {
          x += i;
        }
        acc += x;
        return acc;
      }, 0);
      pos = i;
    } else {
      let currVal = nums.reduce((acc, curr) => {
        const steps = Math.abs(i - curr);
        let x = 0;
        for (let i = 1; i <= steps; i++) {
          x += i;
        }
        acc += x;
        return acc;
      }, 0);
      if (currVal < val) {
        pos = i;
        val = currVal;
      };
      console.log('currVal', currVal, pos);
    }
  }

  console.log('Pos Val', pos, val);
}

solve(advInput);

// solve(['16,1,2,0,4,2,7,1,2,14']);
