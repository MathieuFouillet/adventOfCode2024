import * as fs from 'fs';

const input = fs.readFileSync('2/input.txt', 'utf8');

const lignes = input.split('\n');

type IncrDecrOrEq = 'incr' | 'decr' 
function isSafe(values: Array<number>): number {
    let typeOfSuite: IncrDecrOrEq = values[0] > values[1]?  'decr' : 'incr';
    for(let i = 1; i < values.length; i++) {
        if(typeOfSuite === 'decr' && (values[i-1] <= values[i])) return 0;
        if(typeOfSuite === 'incr' && (values[i-1] >= values[i] ) ) return 0;
        if(Math.abs(values[i] - values[i-1]) > 3) {
            return 0;
        }
        if(Math.abs(values[i] - values[i-1]) < 1) {
            return 0;
        }
    }
    return 1
}

let total = 0
for(let ligne of lignes) {
    const values = ligne.split(" ")
    total += isSafe(values.map(Number));
}

console.log('Total:', total)