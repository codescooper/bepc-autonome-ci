'use client';
import {useEffect,useState} from 'react';
const subjects=[['Mathématiques','14 leçons'],['Français','Programme 3e'],['Physique-Chimie','14 leçons'],['SVT','11 leçons'],['Histoire-Géographie','12 leçons'],['Anglais','8 unités'],['EDHC','13 leçons']];
const lessons=['Calcul littéral','Propriétés de Thalès dans un triangle','Racines carrées','Triangle rectangle','Calcul numérique','Angles inscrits','Vecteurs','Équations et inéquations dans ℝ','Pyramides et cônes','Statistique','Coordonnées de vecteurs','Équations de droites','Applications affines','Équations et inéquations dans ℝ × ℝ'];
export default function Home(){
 const [done,setDone]=useState<string[]>([]);
 useEffect(()=>{try{setDone(JSON.parse(localStorage.getItem('bepc-progress')||'[]'))}catch{}},[]);
 const toggle=(x:string)=>{const n=done.includes(x)?done.filter(v=>v!==x):[...done,x];setDone(n);localStorage.setItem('bepc-progress',JSON.stringify(n))};
 const pct=Math.round(done.length/lessons.length*100);
 return <main>
  <header><div><span className="flag">🇨🇮</span><b>BEPC AUTONOME CI</b></div><span className="offline">● progression locale</span></header>
  <section className="hero"><p className="eyebrow">CLASSE DE 3e · PRÉPARATION BEPC</p><h1>Apprendre à ton rythme.<br/>Réviser avec méthode.</h1><p>Programme ivoirien structuré, entraînement progressif et suivi stocké sur cet appareil.</p><div className="progress"><span style={{width:pct+'%'}}/></div><strong>{pct}% des leçons Maths marquées comme étudiées</strong></section>
  <section><h2>Mes matières</h2><div className="grid">{subjects.map(([n,d],i)=><article key={n} className={i===0?'active':''}><small>{String(i+1).padStart(2,'0')}</small><h3>{n}</h3><p>{d}</p>{i===0&&<span>Disponible dans le MVP →</span>}</article>)}</div></section>
  <section className="study"><div><p className="eyebrow">PARCOURS PILOTE</p><h2>Mathématiques</h2><p>Coche une leçon après l'avoir travaillée. La progression reste enregistrée dans ton navigateur.</p></div><div className="lessons">{lessons.map((l,i)=><button key={l} onClick={()=>toggle(l)} className={done.includes(l)?'done':''}><span>{done.includes(l)?'✓':i+1}</span>{l}</button>)}</div></section>
  <footer>Données pédagogiques alignées sur les sources institutionnelles DPFC · MVP v0.1</footer>
 </main>
}