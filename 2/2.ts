import * as fs from 'fs';

const input = fs.readFileSync('2/input.txt', 'utf8');

const lignes = input.split('\n');

function removeBadValue(values: Array<number>, index: number): Array<number> {
    return values.slice(0, index).concat(values.slice(index+1));
}
function range(start: number, end: number): Array<number> {
    return Array.from({length: end - start}, (_, i) => start + i);
} 

type IncrDecrOrEq = 'incr' | 'decr' 
function isSafe(values: Array<number>, oneRemoved: boolean = false): number {
    let typeOfSuite: IncrDecrOrEq = values[0] > values[1] ? 'decr' : 'incr';
    for(let i = 1; i < values.length; i++) {
        if(typeOfSuite === 'decr' && (values[i-1] <= values[i])) 
            return oneRemoved ? 0 : +range(0, values.length).some(it => isSafe(removeBadValue(values, it), true));
        if(typeOfSuite === 'incr' && (values[i-1] >= values[i] ) ) 
            return oneRemoved ? 0 : +range(0, values.length).some(it => isSafe(removeBadValue(values, it), true));
        if(Math.abs(values[i] - values[i-1]) > 3)
            return oneRemoved ? 0 : +range(0, values.length).some(it => isSafe(removeBadValue(values, it), true));
        if(Math.abs(values[i] - values[i-1]) < 1)
            return oneRemoved ? 0 : +range(0, values.length).some(it => isSafe(removeBadValue(values, it), true));
    }
    return 1
}

let total = 0
for(let ligne of lignes) {
    const values = ligne.split(" ")
    total += isSafe(values.map(Number));
}

console.log('Total:', total)