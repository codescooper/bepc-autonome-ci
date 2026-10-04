'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {loadProgress,Progress,emptyProgress} from '../lib/learning';
import {mathsLessons} from '../lib/maths-content';

const subjects=[['Mathématiques','14 leçons',''],['Français','15 axes/leçons','francais'],['Physique-Chimie','14 leçons','physique-chimie'],['SVT','11 leçons','svt'],['Histoire-Géographie','12 leçons','histoire-geographie'],['Anglais','8 unités','anglais'],['EDHC','13 leçons','edhc']];
const statusLabel:Record<string,string>={interactive:'Interactif',practice_ready:'Exercice prêt',content_ready:'Programme prêt'};

export default function Home(){
 const [progress,setProgress]=useState<Progress>(emptyProgress);
 useEffect(()=>setProgress(loadProgress()),[]);
 const attempted=Object.values(progress.skills).filter(x=>x.attempts>0);const avg=attempted.length?Math.round(attempted.reduce((a,b)=>a+b.score,0)/attempted.length):0;
 return <main><header><div><span className="flag">🇨🇮</span><b>BEPC AUTONOME CI</b></div><span className="offline">● données locales</span></header>
 <section className="hero"><p className="eyebrow">CLASSE DE 3e · PRÉPARATION BEPC</p><h1>Apprendre. Comprendre. S’entraîner.</h1><p>Le parcours Maths commence à devenir interactif. Tes tentatives et ta maîtrise restent enregistrées sur cet appareil.</p><div className="progress"><span style={{width:avg+'%'}}/></div><strong>Maîtrise moyenne évaluée : {avg}%</strong></section>
 <nav className="quickActions"><Link href="/diagnostic"><b>Diagnostic</b><span>Évaluer mon point de départ →</span></Link><Link href="/progres"><b>Mes progrès</b><span>Voir ma maîtrise →</span></Link><Link href="/bepc"><b>Mode BEPC</b><span>Faire un mini-entraînement →</span></Link></nav><section><div className="sectionHead"><div><p className="eyebrow">PARCOURS PILOTE</p><h2>Mathématiques</h2></div><span>{mathsLessons.length} leçons interactives ou en préparation</span></div>
 <div className="lessonCards">{mathsLessons.map((l,i)=><Link href={'/mathematiques/'+l.id} key={l.id}><small>{String(i+1).padStart(2,'0')}</small><div><h3>{l.title}</h3><p>{l.objectives.slice(0,2).join(' · ')}</p></div><b>Ouvrir →</b></Link>)}</div></section>
 <section className="subjects"><h2>Toutes les matières</h2><div className="grid">{subjects.map(([n,d,id],i)=>i===0?<article key={n} className="active"><small>01</small><h3>{n}</h3><p>{d}</p><span>Parcours disponible ↑</span></article>:<Link className="subjectLink" href={'/matiere/'+id} key={n}><article><small>{String(i+1).padStart(2,'0')}</small><h3>{n}</h3><p>{d}</p><span>Ouvrir le parcours →</span></article></Link>)}</div></section>
 <footer>Curriculum aligné DPFC · contenus pédagogiques originaux · progression locale · Release candidate v0.5</footer></main>
}