const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const getLSRating = input => {
  const charLength = input[0].length;
  let inputTrack = input.slice();
  let inputTrack2 = input.slice();

  for (let i = 0; i < charLength; i++) {
    let count0 = 0;
    let count1 = 0;
    for (let j = 0; j < inputTrack2.length; j++) {
      if (inputTrack[j][i] === '1') {
        count1++;
      } else {
        count0++
      }
    }

    inputTrack2 = [];
    if (count1 >= count0) {
      for (let j = 0; j < inputTrack.length; j++) {
        if (inputTrack[j][i] === '1') {
          inputTrack2.push(inputTrack[j]);
        }
      }
    } else {
      for (let j = 0; j < inputTrack.length; j++) {
        if (inputTrack[j][i] === '0') {
          inputTrack2.push(inputTrack[j]);
        }
      }
    }

    inputTrack = inputTrack2.slice();

    if (inputTrack2.length === 1) break;
  }

  console.log('oxygen', inputTrack2);
  console.log('oxygen', parseInt(inputTrack2[0], 2));

  let co2InputTrack = input.slice();
  let co2InputTrack2 = input.slice();

  for (let i = 0; i < charLength; i++) {
    let count0 = 0;
    let count1 = 0;
    for (let j = 0; j < co2InputTrack2.length; j++) {
      if (co2InputTrack[j][i] === '1') {
        count1++;
      } else {
        count0++
      }
    }

    co2InputTrack2 = [];
    if (count0 <= count1) {
      for (let j = 0; j < co2InputTrack.length; j++) {
        if (co2InputTrack[j][i] === '0') {
          co2InputTrack2.push(co2InputTrack[j]);
        }
      }
    } else {
      for (let j = 0; j < co2InputTrack.length; j++) {
        if (co2InputTrack[j][i] === '1') {
          co2InputTrack2.push(co2InputTrack[j]);
        }
      }
    }

    co2InputTrack = co2InputTrack2.slice();

    if (co2InputTrack2.length === 1) break;
  }

  console.log('co2', co2InputTrack2);
  console.log('co2', parseInt(co2InputTrack2[0], 2));

  return parseInt(inputTrack2[0], 2) * parseInt(co2InputTrack2[0], 2);
}

// const lsr = getLSRating([
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
const lsr = getLSRating(advInput);

console.log('lsr', lsr);
