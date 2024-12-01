import * as fs from 'fs';

const input = fs.readFileSync('1/input.txt', 'utf8');

const lignes = input.split('\n');

const left = []
const right = []

for (const ligne of lignes) {
    const [l, r] = ligne.split('   ');
    left.push(parseInt(l));
    right.push(parseInt(r));
}

left.sort()
right.sort()

let result = 0
for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i])
    
}

console.log(result)