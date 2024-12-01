import * as fs from 'fs';

const input = fs.readFileSync('1/input.txt', 'utf8');
const lignes = input.split('\n');

const left = []
const myMap: Map<string, number> = new Map()
for (const ligne of lignes) {
    const [l, r] = ligne.split('   ');
    left.push(l);
    const currentValue = myMap.get(r) ?? 0;
    myMap.set(r, currentValue + 1)
}
let result = 0
for (let i = 0; i < left.length; i++) {
    result += (myMap.get(left[i]) ?? 0) * parseInt(left[i]);
}

console.log(result)