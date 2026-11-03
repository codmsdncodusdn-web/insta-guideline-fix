#!/usr/bin/env node
// 화면 글자·제목·파일명에서 금전 표현을 줄 단위로 찾아낸다.
// 사용: node scan-money.mjs --text "제목 문구"
//       node scan-money.mjs <파일> [파일...]   (파일 내용과 파일명을 함께 검사)
// 결과: 찾으면 종료 코드 1, 없으면 0
import fs from 'node:fs';
import path from 'node:path';

// strict = 제목과 표지에서 보수적으로 빼는 단어 (억은 억울 같은 단어 속에 있어도 잡는다)
const STRICT = /억|돈|매출|수익|가격|값|월급|\d[\d,]*\s*원|[만천백]\s*원|(?<![가-힣])원(?![가-힣])/g;
// extended = 금액을 암시하는 표현. 오탐이 있으니 사람이 문맥을 보고 판단한다
const EXTENDED = /벌(?:었|어|고|면|기|이|려)|벌 수|번다|버는|연봉|순익|현금|부수입|수입|재테크|대박|통장|정산|천만|백만|월\s*\d[\d,]*|월\s*[천백만]|\d[\d,]*\s*[만천백]/g;

// evasion = 자음과 모음을 풀어 쓴 표기(ㅅㅜㅇㅣㄱ, ㅋㅋ와 ㅠㅠ는 잡지 않는다)와 글자 사이를 벌린 표기(수1익, 수 익)
const GAP = '[\\s\\d.\\-_*·~!@#$%^&+=|/\\\\]+';
const EVASION = new RegExp(`[ㄱ-ㅎㅏ-ㅣ]*[ㄱ-ㅎ][ㅏ-ㅣ][ㄱ-ㅎㅏ-ㅣ]*|수${GAP}익|매${GAP}출|가${GAP}격|월${GAP}급`, 'g');

function scanLine(line) {
  const hits = [];
  for (const [level, re] of [['strict', STRICT], ['extended', EXTENDED], ['evasion', EVASION]]) {
    for (const m of line.matchAll(re)) hits.push({ level, word: m[0].trim() });
  }
  return hits;
}

function scan(label, text) {
  let found = 0;
  text.split(/\r?\n/).forEach((line, i) => {
    const hits = scanLine(line);
    if (!hits.length) return;
    found += hits.length;
    const words = hits.map((h) => `${h.word}(${h.level})`).join(', ');
    console.log(`${label}:${i + 1}  ${words}\n    ${line.trim()}`);
  });
  return found;
}

const args = process.argv.slice(2);
if (!args.length) {
  console.error('사용법: node scan-money.mjs --text "문구"  또는  node scan-money.mjs <파일>');
  process.exit(2);
}

let total = 0;
if (args[0] === '--text') {
  total += scan('text', args.slice(1).join(' '));
} else {
  for (const file of args) {
    total += scan('filename', path.basename(file));
    total += scan(path.basename(file), fs.readFileSync(file, 'utf8'));
  }
}

console.log(total ? `\n확인할 표현 ${total}건` : '금전 단어 없음 (주장 점검은 별도로 필요)');
process.exit(total ? 1 : 0);
