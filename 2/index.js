const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(e => e.split(' '));

const getFinalPosition = input => {
  let totalX = 0;
  let totalY = 0;

  for (let i = 0; i < input.length; i++) {
    const [direction, value] = input[i];
    console.log(`dir ${direction} val ${value}`);

    if (!['forward', 'down', 'up'].includes(direction)) throw Error('fucked up input', i);

    switch (direction) {
      case 'forward':
        totalX += Number(value);
        break;
      case 'down':
        totalY += Number(value);
        break;
      case 'up':
        totalY -= Number(value);
        break;
    }
  }

  return totalX * totalY;
};

const advOutput = getFinalPosition(advInput);

console.log('position', advOutput); // 1746616
