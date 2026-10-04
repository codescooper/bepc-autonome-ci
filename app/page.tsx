'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {loadProgress,Progress,emptyProgress} from '../lib/learning';
import {mathsLessons} from '../lib/maths-content';

const subjects=[['Mathématiques','14 leçons'],['Français','Programme 3e'],['Physique-Chimie','14 leçons'],['SVT','11 leçons'],['Histoire-Géographie','12 leçons'],['Anglais','8 unités'],['EDHC','13 leçons']];
const statusLabel:Record<string,string>={interactive:'Interactif',practice_ready:'Exercice prêt',content_ready:'Programme prêt'};

export default function Home(){
 const [progress,setProgress]=useState<Progress>(emptyProgress);
 useEffect(()=>setProgress(loadProgress()),[]);
 const attempted=Object.values(progress.skills).filter(x=>x.attempts>0);const avg=attempted.length?Math.round(attempted.reduce((a,b)=>a+b.score,0)/attempted.length):0;
 return <main><header><div><span className="flag">🇨🇮</span><b>BEPC AUTONOME CI</b></div><span className="offline">● données locales</span></header>
 <section className="hero"><p className="eyebrow">CLASSE DE 3e · PRÉPARATION BEPC</p><h1>Apprendre. Comprendre. S’entraîner.</h1><p>Le parcours Maths commence à devenir interactif. Tes tentatives et ta maîtrise restent enregistrées sur cet appareil.</p><div className="progress"><span style={{width:avg+'%'}}/></div><strong>Maîtrise moyenne évaluée : {avg}%</strong></section>
 <section><div className="sectionHead"><div><p className="eyebrow">PARCOURS PILOTE</p><h2>Mathématiques</h2></div><span>{mathsLessons.length} leçons interactives ou en préparation</span></div>
 <div className="lessonCards">{mathsLessons.map((l,i)=><Link href={'/mathematiques/'+l.id} key={l.id}><small>{String(i+1).padStart(2,'0')}</small><div><h3>{l.title}</h3><p>{l.objectives.slice(0,2).join(' · ')}</p></div><b>Ouvrir →</b></Link>)}</div></section>
 <section className="subjects"><h2>Toutes les matières</h2><div className="grid">{subjects.map(([n,d],i)=><article key={n} className={i===0?'active':''}><small>{String(i+1).padStart(2,'0')}</small><h3>{n}</h3><p>{d}</p>{i===0&&<span>Parcours disponible →</span>}</article>)}</div></section>
 <footer>Curriculum aligné DPFC · contenus pédagogiques originaux · progression locale · MVP v0.3</footer></main>
}