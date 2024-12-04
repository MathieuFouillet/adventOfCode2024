import * as fs from 'fs';

const input = fs.readFileSync('4/input.txt', 'utf8');
const data = Array<string>();

for (const ligne of input.split('\n')) {
  data.push(ligne);
}

function checkLine(startY: number, startX: number): number {
  if (
    data[startY][startX + 1] === 'M' &&
    data[startY][startX + 2] === 'A' &&
    data[startY][startX + 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}
function checkLineReverse(startY: number, startX: number): number {
  if (
    data[startY][startX - 1] === 'M' &&
    data[startY][startX - 2] === 'A' &&
    data[startY][startX - 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}

function checkDiagDown(startY: number, startX: number): number {
  if (
    data[startY + 1] &&
    data[startY + 1][startX + 1] === 'M' &&
    data[startY + 2] &&
    data[startY + 2][startX + 2] === 'A' &&
    data[startY + 3] &&
    data[startY + 3][startX + 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}
function checkDiagUp(startY: number, startX: number): number {
  if (
    data[startY - 1] &&
    data[startY - 1][startX + 1] === 'M' &&
    data[startY - 2] &&
    data[startY - 2][startX + 2] === 'A' &&
    data[startY - 3] &&
    data[startY - 3][startX + 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}

function checkDiagDownReverse(startY: number, startX: number): number {
  if (
    data[startY + 1] &&
    data[startY + 1][startX - 1] === 'M' &&
    data[startY + 2] &&
    data[startY + 2][startX - 2] === 'A' &&
    data[startY + 3] &&
    data[startY + 3][startX - 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}
function checkDiagUpReverse(startY: number, startX: number): number {
  if (
    data[startY - 1] &&
    data[startY - 1][startX - 1] === 'M' &&
    data[startY - 2] &&
    data[startY - 2][startX - 2] === 'A' &&
    data[startY - 3] &&
    data[startY - 3][startX - 3] === 'S'
  ) {
    return 1;
  }
  return 0;
}

function checkColumn(startY: number, startX: number): number {
  if (
    data[startY + 1] &&
    data[startY + 1][startX] === 'M' &&
    data[startY + 2] &&
    data[startY + 2][startX] === 'A' &&
    data[startY + 3] &&
    data[startY + 3][startX] === 'S'
  ) {
    return 1;
  }
  return 0;
}

function checkColumnReverse(startY: number, startX: number): number {
  if (
    data[startY - 1] &&
    data[startY - 1][startX] === 'M' &&
    data[startY - 2] &&
    data[startY - 2][startX] === 'A' &&
    data[startY - 3] &&
    data[startY - 3][startX] === 'S'
  ) {
    return 1;
  }
  return 0;
}

let total = 0;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if (data[y][x] === 'X') {
      total +=
        checkLine(y, x) +
        checkColumn(y, x) +
        checkLineReverse(y, x) +
        checkColumnReverse(y, x) +
        checkDiagDown(y, x) +
        checkDiagUp(y, x) +
        checkDiagDownReverse(y, x) +
        checkDiagUpReverse(y, x);
    }
  }
}

console.log('Total:', total);
