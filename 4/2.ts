import * as fs from 'fs';

const input = fs.readFileSync('4/input.txt', 'utf8');
const data = Array<string>();

for (const ligne of input.split('\n')) {
  data.push(ligne);
}

function checkDiagDown(startY: number, startX: number): number {
  if (
    data[startY + 1] &&
    data[startY + 1][startX + 1] === 'M' &&
    data[startY - 1] &&
    data[startY - 1][startX - 1] === 'S'
  ) {
    return 1;
  } else if (
    data[startY + 1] &&
    data[startY + 1][startX + 1] === 'S' &&
    data[startY - 1] &&
    data[startY - 1][startX - 1] === 'M'
  ) {
    return 1;
  }
  return 0;
}
function checkDiagUp(startY: number, startX: number): number {
  if (
    data[startY - 1] &&
    data[startY - 1][startX + 1] === 'M' &&
    data[startY + 1] &&
    data[startY + 1][startX - 1] === 'S'
  ) {
    return checkDiagDown(startY, startX);
  } else if (
    data[startY - 1] &&
    data[startY - 1][startX + 1] === 'S' &&
    data[startY + 1] &&
    data[startY + 1][startX - 1] === 'M'
  ) {
    return checkDiagDown(startY, startX);
  }
  return 0;
}

let total = 0;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if (data[y][x] === 'A') {
      total += checkDiagUp(y, x);
    }
  }
}

console.log('Total:', total);
