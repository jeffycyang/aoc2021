const fs = require('fs');

const advInput = fs.readFileSync('./input.txt')
  .toString()
  .split('\r\n');

const solve = (input) => {
  const formatted = input.map(e => e.split('-'));
  console.log('formatted', formatted);

  const starts = formatted.map((pt, ind) => ({ pt, ind })).filter(e => e.pt.includes('start'));

// console.log('starts', starts);

  const paths = [];
  starts.forEach(start => {
    const { pt, ind } = start;

    let graph = formatted.slice();
    graph.splice(ind, 1);
    graph = graph
      .filter(e => !e.includes('start'))

    const currPath = ['start', pt.filter(e => e !== 'start')[0]].toString();

    recurse(graph, currPath, paths);
  });

  // console.log('paths', paths);
  console.log('pL', paths.length);
}

const recurse = (graph, curr, allPaths) => {
  const currTail = curr.split(',').pop();

  if (currTail === 'end') {
    allPaths.push(curr);
    return;
  }

  graph.forEach((g, ind) => {
    if (g.includes(currTail)) {
      const notTail = g.filter(e => e !== currTail)[0];

      if (
        notTail === notTail.toLowerCase() &&
        (!curr.split(',').includes(notTail) || curr.split(',').filter(e => e === notTail).length === 1 && unique(curr.split(',').filter(e => e === e.toLowerCase()))) &&
        !curr.split(',').includes('end')
      ) {

        if (notTail === 'end') {
          allPaths.push(`${curr},${notTail}`);
          return;
        } else {
          recurse(graph, `${curr},${notTail}`, allPaths);
        }

      } else if (notTail !== notTail.toLowerCase()) {
        recurse(graph, `${curr},${notTail}`, allPaths);
      }
    }
  });
}

const unique = (arr) => (new Set(arr)).size === arr.length;

solve(advInput);

// solve([
//   'start-A',
//   'start-b',
//   'A-b',
//   'A-c',
//   'b-d',
//   'A-end',
//   'b-end'
// ]);

// solve([
//   'dc-end',
//   'HN-start',
//   'start-kj',
//   'dc-start',
//   'dc-HN',
//   'LN-dc',
//   'HN-end',
//   'kj-sa',
//   'kj-HN',
//   'kj-dc'
// ]);

// solve([
// 'fs-end',
// 'he-DX',
// 'fs-he',
// 'start-DX',
// 'pj-DX',
// 'end-zg',
// 'zg-sl',
// 'zg-pj',
// 'pj-he',
// 'RW-he',
// 'fs-DX',
// 'pj-RW',
// 'zg-RW',
// 'start-pj',
// 'he-WI',
// 'zg-he',
// 'pj-fs',
// 'start-RW'
// ]);
