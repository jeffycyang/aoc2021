// gamma rate = most common bit per position
// epsilon  = least common
const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const getPowerConsumption = input => {
  const charLength = input[0].length;
  let gamma = '';

  for (let i = 0; i < charLength; i++) {
    let count0 = 0;
    let count1 = 0;
    for (let j = 0; j < input.length; j++) {
      if (Number(input[j][i]) === 1) {
        count1++;
      } else {
        count0++
      }
    }

    if (count1 > count0) {
      gamma = gamma + '1';
    } else {
      gamma = gamma + '0';
    }
  }

  let epsilon = '';
  for (const c of gamma) {
    if (c === '1') {
      epsilon = epsilon + '0'
    } else {
      epsilon = epsilon + '1'
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

// const power = getPowerConsumption([
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010',
// ]);
const power = getPowerConsumption(advInput);

console.log('power', power);
