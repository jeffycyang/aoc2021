const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const initial = input[0];

  const rules = input.slice(2);
// console.log('rules', rules);

  const steps = 40;

  let poly = initial.split('');
  // console.log('polyI', poly);
  for (let i = 0; i < steps; i++) {
console.log('step', i);
    const inserts = [];
    poly.forEach((p, ind) => {
      if (
        ind !== poly.length - 1 &&
        rules.map(e => e.split(' -> ')[0]).includes(`${p}${poly[ind + 1]}`)
      ) {
        const index = rules.map(e => e.split(' -> ')[0]).indexOf(`${p}${poly[ind + 1]}`);
        const char = rules[index].split(' -> ')[1];

        currNoInserts = inserts.length;

        inserts.push({
          char,
          index: ind + currNoInserts
        });
      }
    });

    inserts.forEach(ins => {
      const { char, index } = ins;

      poly.splice(index+1, 0, char);
    });

    // console.log('poly', poly);
  }

  const counts = poly
    .reduce((acc, curr) => {
      if (acc[curr] !== undefined) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  console.log('counts', counts);

  const minMax = Object.entries(counts).reduce((acc, curr) => {
    const [ key, val ] = curr;

    if (!acc.min) acc.min = val;
    if (!acc.max) acc.max = val;

    if (val > acc.max) acc.max = val;
    if (val < acc.min) acc.min = val;

    return acc;
  }, { min: 0, max: 0 });

  console.log('minMax', minMax);
  console.log('sub', minMax.max - minMax.min);
}

solve(advInput);

// solve([
//   'NNCB',
//   '',
//   'CH -> B',
//   'HH -> N',
//   'CB -> H',
//   'NH -> C',
//   'HB -> C',
//   'HC -> B',
//   'HN -> C',
//   'NN -> C',
//   'BH -> H',
//   'NC -> B',
//   'NB -> B',
//   'BN -> B',
//   'BB -> N',
//   'BC -> B',
//   'CC -> N',
//   'CN -> C'
// ]);
