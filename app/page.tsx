'use client';
import {useEffect,useState} from 'react';

const skills=['Identifier un polynôme','Calculer avec les puissances et les polynômes','Développer une expression','Réduire une expression','Factoriser une expression','Déterminer le domaine d’une fraction rationnelle','Simplifier une fraction rationnelle','Traiter une situation'];
const exercises=[
 {q:'Développe et réduis A = 3(x + 4) - 2(x - 1).',a:'x+14',display:'A = x + 14',help:'Distribue 3 puis -2, puis regroupe les termes en x et les constantes.',explain:'3x + 12 - 2x + 2 = x + 14.'},
 {q:'Factorise B = 5x² - 15x.',a:'5x(x-3)',display:'B = 5x(x - 3)',help:'Cherche le plus grand facteur commun aux deux termes.',explain:'5x est commun : 5x² - 15x = 5x(x - 3).'}
];
const norm=(v:string)=>v.toLowerCase().replace(/\s/g,'').replaceAll('×','*').replaceAll('²','^2').replace(/^a=/,'').replace(/^b=/,'').replaceAll('*','');

export default function Home(){
 const [screen,setScreen]=useState<'home'|'lesson'>('home');
 const [done,setDone]=useState<string[]>([]);
 const [step,setStep]=useState(0); const [value,setValue]=useState(''); const [result,setResult]=useState<'ok'|'bad'|null>(null);
 useEffect(()=>{try{setDone(JSON.parse(localStorage.getItem('bepc-progress')||'[]'))}catch{}},[]);
 const saveDone=()=>{const n=done.includes('Calcul littéral')?done:[...done,'Calcul littéral'];setDone(n);localStorage.setItem('bepc-progress',JSON.stringify(n))};
 const check=()=>{const aliases=step===0?['x+14']:['5x(x-3)','5x(x−3)'];setResult(aliases.map(norm).includes(norm(value))?'ok':'bad')};
 if(screen==='lesson') return <main>
  <header><button className="back" onClick={()=>setScreen('home')}>← Tableau de bord</button><b>BEPC AUTONOME CI</b><span className="offline">Mathématiques · 3e</span></header>
  <section className="lessonHero"><p className="eyebrow">LEÇON 01 · CALCULS ALGÉBRIQUES</p><h1>Calcul littéral</h1><p>Apprendre à transformer une expression sans changer sa valeur : développer, réduire, factoriser et simplifier.</p></section>
  <section className="lessonGrid">
   <aside><h3>Objectifs</h3>{skills.map((s,i)=><div className="skill" key={s}><span>{i+1}</span>{s}</div>)}</aside>
   <div className="course">
    <div className="concept"><small>À RETENIR</small><h2>Développer puis réduire</h2><p><b>Développer</b>, c’est supprimer les parenthèses en utilisant la distributivité.</p><div className="formula">k(a + b) = ka + kb</div><p><b>Réduire</b>, c’est regrouper les termes de même nature.</p><div className="example"><span>Exemple</span><p>2(x + 3) + 4x = 2x + 6 + 4x = <b>6x + 6</b></p></div></div>
    <div className="exercise"><p className="eyebrow">EXERCICE {step+1} / {exercises.length}</p><h2>{exercises[step].q}</h2><input value={value} onChange={e=>{setValue(e.target.value);setResult(null)}} placeholder="Écris ta réponse…" onKeyDown={e=>e.key==='Enter'&&check()}/>
     <button className="primary" onClick={check}>Vérifier ma réponse</button>
     {result==='bad'&&<div className="feedback bad"><b>Pas encore.</b><p>{exercises[step].help}</p><button onClick={()=>setResult('ok')}>Voir la correction</button></div>}
     {result==='ok'&&<div className="feedback ok"><b>{value?'Correction':'Solution'} : {exercises[step].display}</b><p>{exercises[step].explain}</p>{step<exercises.length-1?<button onClick={()=>{setStep(step+1);setValue('');setResult(null)}}>Exercice suivant →</button>:<button onClick={()=>{saveDone();setScreen('home')}}>Terminer la leçon ✓</button>}</div>}
    </div>
   </div>
  </section>
 </main>;
 const pct=Math.round(done.length/14*100);
 return <main><header><div><span className="flag">🇨🇮</span><b>BEPC AUTONOME CI</b></div><span className="offline">● progression locale</span></header>
 <section className="hero"><p className="eyebrow">CLASSE DE 3e · PRÉPARATION BEPC</p><h1>Ton parcours commence ici.</h1><p>Une première leçon interactive est prête. Ta progression reste enregistrée sur cet appareil.</p><div className="progress"><span style={{width:pct+'%'}}/></div><strong>{pct}% du parcours Maths complété</strong></section>
 <section className="continue"><div><p className="eyebrow">CONTINUER</p><h2>01 · Calcul littéral</h2><p>Développer · réduire · factoriser · fractions rationnelles</p></div><button className="primary" onClick={()=>setScreen('lesson')}>{done.includes('Calcul littéral')?'Revoir la leçon':'Commencer la leçon'} →</button></section>
 <section><h2>Matières</h2><div className="grid">{[['Mathématiques','14 leçons'],['Français','Programme 3e'],['Physique-Chimie','14 leçons'],['SVT','11 leçons'],['Histoire-Géographie','12 leçons'],['Anglais','8 unités'],['EDHC','13 leçons']].map(([n,d],i)=><article key={n} className={i===0?'active':''}><small>{String(i+1).padStart(2,'0')}</small><h3>{n}</h3><p>{d}</p>{i===0&&<span>Parcours interactif disponible →</span>}</article>)}</div></section>
 <footer>Données alignées sur le curriculum DPFC · contenus d’apprentissage originaux · MVP v0.2</footer></main>
}