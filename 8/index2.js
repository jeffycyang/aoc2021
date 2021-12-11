const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const trimI = input.map(l => l.split(' | ')[0]);
  const trimO = input.map(l => l.split(' | ')[1]);

  const codes = [];

  trimI.forEach((tiline, index) => {
    const digs = tiline.split(' ');
    const map = {};
    digs.forEach(dig => {
      if (dig.length === 2) map['1'] = dig;
      if (dig.length === 3) map['7'] = dig;
      if (dig.length === 4) map['4'] = dig;
      if (dig.length === 7) map['8'] = dig;
    });
    const fiv = digs.filter(dig => dig.length === 5);
    let threeInd;
    fiv.forEach((fv, id) => {
      const one = map['1'].split('');
      if (one.every(e => fv.split('').includes(e))) {
        map['3'] = fv;
        threeInd = id;
      }
    });
    fiv.splice(threeInd, 1);
    const matchThreeSegs = 3 === fiv[0]
      .split('')
      .reduce((acc, curr) => {
        if (map['4'].split('').includes(curr)) return acc + 1;
        return acc;
      }, 0)
    if (matchThreeSegs) {
      map['5'] = fiv[0];
      map['2'] = fiv[1];
    } else {
      map['5'] = fiv[1];
      map['2'] = fiv[0];
    }

    // 0, 6, 9
    const six = digs.filter(dig => dig.length === 6);
    let nineInd;
    six.forEach((sx, id) => {
      const four = map['4'].split('');
      if (four.every(e => sx.split('').includes(e))) {
        map['9'] = sx;
        nineInd = id;
      }
    });
    six.splice(nineInd, 1);

    if (map['5'].split('').every(e => six[0].split('').includes(e))) {
      map['6'] = six[0];
      map['0'] = six[1];
    } else {
      map['6'] = six[1];
      map['0'] = six[0];
    }

    console.log('MAP', map);
    const toline = trimO[index].split(' ');
    const code = toline.reduce((acc, curr) => {
      let char;
      Object.entries(map).forEach(e => {
        const [digit, charRep] = e;
        if (curr.split('').every(e => charRep.split('').includes(e)) && curr.length === charRep.length) {
          char = digit;
        }
      });
      return acc + char;
    }, '');

    console.log('code', code);
    codes.push(code);
  });

  const total = codes.reduce((acc, curr) => acc + Number(curr), 0);
  console.log('total', total);
}

solve(advInput);

// solve([
//   'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
//   'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
//   'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
//   'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
//   'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
//   'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
//   'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
//   'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
//   'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
//   'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
// ]);
