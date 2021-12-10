const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const dict = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<':'>'
};

const isBalanced = (s) => {
  const stack = []

  for (let i = 0; i < s.length; i++) {
    if (
      s[i] === '('
      || s[i] === '['
      || s[i] === '{'
      || s[i] === '<'
    ) {
      stack.push(s[i]);
    } else {
      if (s[i] !== dict[stack.pop()]) return { bool: false, ind: i };
    }
  }

  return { bool: true };
};

const returnCompletion = s => {
  const stack = []

  for (let i = 0; i < s.length; i++) {
    if (
      s[i] === '('
      || s[i] === '['
      || s[i] === '{'
      || s[i] === '<'
    ) {
      stack.push(s[i]);
    } else {
      if (s[i] !== dict[stack.pop()]) return { bool: false, ind: i };
    }
  }

  return stack.map(c => dict[c]);
};

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const solve = (input) => {
  let scores = [];

  const incs = [];

  for (let i = 0; i < input.length; i++) {
    console.log('inp', input[i]);
    const { bool, ind } = isBalanced(input[i]);
    if (bool) {
      incs.push(input[i]);
    }
  }

  incs.forEach(inc => {
    const comp = returnCompletion(inc);
    console.log('comp', comp);
    let total = 0;
    comp.reverse().forEach(c => {
      total = (total * 5) + points[c];
    });
    scores.push(total);
  });

  scores.sort((a, b) => a - b);
  const mid = (scores.length - 1)/2;

  console.log('score', scores[mid]);
};

solve(advInput);

// solve([
//   '[({(<(())[]>[[{[]{<()<>>',
//   '[(()[<>])]({[<{<<[]>>(',
//   '{([(<{}[<>[]}>{[]{[(<()>',
//   '(((({<>}<{<{<>}{[]{[]{}',
//   '[[<[([]))<([[{}[[()]]]',
//   '[{[{({}]{}}([{[{{{}}([]',
//   '{<[[]]>}<{[{[{[]{()[[[]',
//   '[<(<(<(<{}))><([]([]()',
//   '<{([([[(<>()){}]>(<<{{',
//   '<{([{{}}[<[[[<>{}]]]>[]]',
// ]);
