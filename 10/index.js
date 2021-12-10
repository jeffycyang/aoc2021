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

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const solve = (input) => {
  let score = 0;

  for (let i = 0; i < input.length; i++) {
    console.log('inp', input[i]);
    const { bool, ind } = isBalanced(input[i]);
    if (!bool) {
     const char = input[i][ind];
     console.log('char', char);
     if (!isNaN(points[char])) {
      score += points[char];
     }
    }
  }

  console.log('score', score);
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
