import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('5/input.txt', 'utf8');
const reader = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

type Page = {
  pagesBefore: Array<number>;
  pagesAfter: Array<number>;
};

const allPages = new Map<number, Page>();
const reg = new RegExp(/(\d{2})\|(\d{2})/);

function checkValidManuel(manuel: Array<number>): boolean {
  return manuel.every((page, index, currentManuel) => {
    const pageData = allPages.get(page);
    if (!pageData) {
      return false;
    }
    return currentManuel
      .slice(index + 1)
      .every((nextPage) => pageData.pagesAfter.includes(nextPage));
  });
}

function orderManuel(manuel: Array<number>): Array<number> {
  const newManuel = (() => {
    for (let index = 0; index < manuel.length; index++) {
      const page = manuel[index];
      const pageData = allPages.get(page);
      if (!pageData) {
        throw new Error('Should not happen');
      }
      const manuelSlice = manuel.slice(index + 1);
      for (let i = 0; i < manuelSlice.length; i++) {
        if (!pageData.pagesAfter.includes(manuelSlice[i])) {
          const begining = manuel.slice(0, index);
          begining.push(manuelSlice[i], page);
          manuelSlice.splice(i, 1);
          return [...begining, ...manuelSlice];
        }
      }
    }
    throw new Error('Should not happen');
  })();

  if (checkValidManuel(newManuel)) return newManuel;
  return orderManuel(newManuel);
}

async function main() {
  for await (const ligne of reader) {
    if (ligne === '') {
      break;
    }
    const parse = reg.exec(ligne);
    if (!parse) break;
    const [, left, right] = parse;
    const leftAsNumber = parseInt(left);
    const rightAsNumber = parseInt(right);

    const lPage: Page = allPages.get(leftAsNumber) ?? {
      pagesBefore: [],
      pagesAfter: [],
    };
    lPage.pagesAfter.push(rightAsNumber);
    // lPage.pagesAfter.sort();

    const rPage = allPages.get(rightAsNumber) ?? {
      pagesBefore: [],
      pagesAfter: [],
    };
    rPage.pagesBefore.push(leftAsNumber);
    // rPage.pagesBefore.sort();

    allPages.set(leftAsNumber, lPage);
    allPages.set(rightAsNumber, rPage);
  }

  const manuelInValidOrder = Array<Array<number>>();

  for await (const ligne of reader) {
    const manuel = ligne.split(',').map((v) => parseInt(v));
    if (!checkValidManuel(manuel)) manuelInValidOrder.push(orderManuel(manuel));
    console.log('pageDone');
  }
  const total = manuelInValidOrder.reduce((acc, manuel) => {
    return acc + manuel[Math.floor(manuel.length / 2)];
  }, 0);
  console.log('Total:', total);
}

main().then(() => console.log('done'));
