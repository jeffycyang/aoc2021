const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  console.log('input', input);

  let total = 0;

  const split = [];

  let formattedTop = input[0].split(',').map(e => Number(e));

  while (formattedTop.length) {
    split.push(formattedTop.splice(0,1));
  }

  split.forEach(formatted => {
    let oldFormatted = [];

    for (let i = 0; i < 256; i++) {
      if (formatted.length > 800000) {
        oldFormatted.push(formatted);
        formatted = [];
      }

      let born = 0;

      formatted.forEach((e, ind) => {
        if (e === 0) {
          born++;
          formatted[ind] = 6;
        } else {
          formatted[ind] = e - 1;
        }
      });

      oldFormatted.forEach(arr => {
        arr.forEach((e, ind) => {
          if (e === 0) {
            born++;
            arr[ind] = 6;
          } else {
            arr[ind] = e - 1;
          }
        });
      });

      for (let j = 0; j < born; j++) {
        if (formatted.length < 800000){
          formatted.push(8);
        } else {
          oldFormatted.push(formatted);
          formatted = [8];
        }
      }

      console.log(oldFormatted.length);
    }

    const len = formatted.length + oldFormatted.reduce((acc, curr) => acc += curr.length, 0);
    console.log('length', len);
    total += len;
  });

  console.log('total', total);
}

// solve(advInput);

solve(['3,4,3,1,2']);
