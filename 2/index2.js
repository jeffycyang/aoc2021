const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(e => e.split(' '));

const getFinalPosition = input => {
  let totalX = 0;
  let totalY = 0;
  let aim = 0;

  for (let i = 0; i < input.length; i++) {
    const [command, value] = input[i];

    if (!['forward', 'down', 'up'].includes(command)) throw Error('fucked up input', i);

    // up/down -> decrease/increase aim
    switch (command) {
      case 'forward':
        totalX += Number(value);
        totalY += aim * Number(value);
        break;
      case 'down':
        aim += Number(value);
        break;
      case 'up':
        aim -= Number(value);
        break;
    }
  }

  return totalX * totalY;
};

const advOutput = getFinalPosition(advInput);

console.log('position', advOutput); // 1741971043
