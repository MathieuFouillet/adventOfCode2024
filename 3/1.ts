import * as fs from 'fs';

const input = fs.readFileSync('3/input.txt', 'utf8');

let total = 0
const reg = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g)
for(let ligne of input.split('\n')) {
    let parsed = reg.exec(ligne)
    while(parsed) {
        total += parseInt(parsed[1]) * parseInt(parsed[2])
        parsed = reg.exec(ligne)
    }
}
console.log('Total:', total)