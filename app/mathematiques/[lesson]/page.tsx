'use client';
import {use, useEffect,useState} from 'react';
import Link from 'next/link';
import {lessonById} from '../../../lib/maths-content';
import MasteryCard from '../../../components/MasteryCard';
import {emptyProgress,loadProgress,normalize,Progress,recordAttempt,saveProgress} from '../../../lib/learning';
import {loadGame,reward,saveGame,scheduleCard} from '../../../lib/gamification';
import {playFeedback} from '../../../components/SoundFeedback';

export default function LessonPage({params}:{params:Promise<{lesson:string}>}){
 const {lesson}=use(params);const data=lessonById(lesson);const [progress,setProgress]=useState<Progress>(emptyProgress);const [step,setStep]=useState(0);const [value,setValue]=useState('');const [result,setResult]=useState<'ok'|'bad'|null>(null);
 useEffect(()=>setProgress(loadProgress()),[]);
 if(!data)return <main><header><Link href="/">← Accueil</Link><b>BEPC AUTONOME CI</b></header><section className="hero"><h1>Leçon indisponible</h1></section></main>;
 const activity=data.activities[step];
 const check=()=>{const ok=activity.answers.map(normalize).includes(normalize(value));setResult(ok?'ok':'bad');playFeedback(ok);const next=recordAttempt(progress,activity.skill,ok);setProgress(next);saveProgress(next);let g=reward(loadGame(),ok,activity.skill);if(ok)g=scheduleCard(g,{id:'maths:'+data.id+':'+activity.id,front:activity.prompt,back:activity.display+' — '+activity.explanation,skill:activity.skill,subject:'Mathématiques'});saveGame(g)};
 const next=()=>{if(step<data.activities.length-1){setStep(step+1);setValue('');setResult(null)}};
 return <main><header><Link className="back" href="/">← Tableau de bord</Link><b>BEPC AUTONOME CI</b><span className="offline">Mathématiques · 3e</span></header>
 <section className="lessonHero"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.summary}</p></section>
 <section className="lessonGrid"><aside><h3>Objectifs</h3>{data.objectives.map((x,i)=><div className="skill" key={x}><span>{i+1}</span>{x}</div>)}</aside>
 <div className="course">{data.concepts.map(c=><div className="concept" key={c.title}><small>À RETENIR</small><h2>{c.title}</h2><p>{c.text}</p>{c.formula&&<div className="formula">{c.formula}</div>}{c.example&&<div className="example"><span>Exemple</span><p>{c.example}</p></div>}</div>)}
 {activity&&<div className="exercise"><p className="eyebrow">EXERCICE {step+1} / {data.activities.length}</p><h2>{activity.prompt}</h2><input value={value} onChange={e=>{setValue(e.target.value);setResult(null)}} placeholder="Écris ta réponse…" onKeyDown={e=>e.key==='Enter'&&check()}/><button className="primary" onClick={check}>Vérifier</button>
 {result==='bad'&&<div className="feedback bad"><b>Essaie encore.</b><p>{activity.hint}</p></div>}
 {result==='ok'&&<div className="feedback ok"><b>{activity.display}</b><p>{activity.explanation}</p>{step<data.activities.length-1?<button onClick={next}>Exercice suivant →</button>:<Link href="/">Terminer et revenir au tableau de bord ✓</Link>}</div>}</div>}
 <div className="masteryPanel"><p className="eyebrow">MAÎTRISE</p><h2>Suivi de cette leçon</h2>{data.activities.map(a=><MasteryCard key={a.id} name={a.skill} state={progress.skills[a.skill]}/>)}</div></div></section></main>
}
