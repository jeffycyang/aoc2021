const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  console.log('input', input);
  let formatted = input[0].split(',').map(e => Number(e));

  for (let i = 0; i < 80; i++) {
    let born = 0;

    formatted = formatted.map(e => {
      if (e === 0) {
        born++;
        return 6
      };
      return e - 1;
    });

    // const num0 = formatted.reduce((acc, curr) => {
    //   if (curr === 0) acc++;
    //   return acc;
    // }, 0);

    for (let j = 0; j < born; j++) {
      formatted.push(8);
    }

    // console.log(formatted);
  }

  console.log('length', formatted.length);
}

solve(advInput);

// solve(['3,4,3,1,2']);
