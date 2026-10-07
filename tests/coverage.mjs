import fs from 'node:fs';
const read=n=>fs.readFileSync('lib/'+n,'utf8');
const countMk=s=>(s.match(/\nmk\('/g)||[]).length;
const counts={
  mathematiques: countMk(read('maths-rich-batch.ts'))+2,
  francais: countMk(read('french-rich-batch.ts')),
  'physique-chimie': countMk(read('pc-rich-batch.ts')),
  svt: countMk(read('svt-rich-batch.ts')),
  'histoire-geographie': countMk(read('hg-rich-batch.ts')),
  anglais: countMk(read('english-rich-batch.ts')),
  edhc: countMk(read('edhc-rich-batch.ts')),
};
const complementary=read('complementary-rich-batch.ts');
for(const subject of ['espagnol','allemand','tice','eps','arts-plastiques','education-musicale']){
  counts[subject]=(complementary.match(new RegExp("mk\\('"+subject+"'",'g'))||[]).length;
}
const expected={mathematiques:14,francais:17,'physique-chimie':14,svt:11,'histoire-geographie':12,anglais:8,edhc:13,espagnol:7,allemand:8,tice:7,eps:6,'arts-plastiques':9,'education-musicale':16};
let failed=false;
for(const [subject,want] of Object.entries(expected)){const got=counts[subject]??0;console.log(got===want?'✓':'✗',subject,got+'/'+want);if(got!==want)failed=true}
if(failed)process.exit(1);
const total=Object.values(expected).reduce((a,b)=>a+b,0);
const gotTotal=Object.values(counts).reduce((a,b)=>a+b,0);
if(gotTotal!==total){console.error('Total mismatch',gotTotal,total);process.exit(1)}
console.log('Pedagogical coverage gate OK · '+gotTotal+'/'+total+' units declared across 13 subjects');
