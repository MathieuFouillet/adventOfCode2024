import * as fs from 'fs';

const input = fs.readFileSync('3/input.txt', 'utf8');

let total = 0;
const regMul = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g);
const regDo = new RegExp(/do\(\)/g);

const regDont = new RegExp(/don't\(\)/g);
const allMul: Map<number, number> = new Map();
const allDo: Array<number> = [];
const allDont: Array<number> = [];

let offsetLigneLength = 0;
for (const ligne of input.split('\n')) {
    let parsedMul = regMul.exec(ligne);
    while (parsedMul) {
        allMul.set(
            parsedMul.index + offsetLigneLength,
            parseInt(parsedMul[1]) * parseInt(parsedMul[2])
        );
        parsedMul = regMul.exec(ligne);
    }
    let parsedDo = regDo.exec(ligne);
    while (parsedDo) {
        allDo.push(parsedDo.index + offsetLigneLength);
        parsedDo = regDo.exec(ligne);
    }
    let parsedDont = regDont.exec(ligne);
    while (parsedDont) {
        allDont.push(parsedDont.index + offsetLigneLength);
        parsedDont = regDont.exec(ligne);
    }
    offsetLigneLength += ligne.length;
}
let isDo = true;
let iDo = 0;
let iDont = 0;
allMul.forEach((value, key) => {
    while (allDo[iDo] < key || allDont[iDont] < key) {
        if (!allDont[iDont] || allDo[iDo] < allDont[iDont]) {
            isDo = true;
            iDo++;
            if (!allDont[iDont]) break;
        } else {
            isDo = false;
            iDont++;
            if (!allDo[iDo]) break;
        }
    }
    total += isDo ? value : 0;
});
console.log('Total:', total);
