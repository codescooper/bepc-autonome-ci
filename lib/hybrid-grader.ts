import type {TestItem} from './rich-lessons';
import {evaluateAnswer} from './evaluation';
export type Criterion={id:string;label:string;weight:number;acceptedPhrases:string[]};
export type Rubric={questionId:string;criteria:Criterion[];forbiddenClaims?:string[];minConfidence:number};
export type LocalJudgeResult={verdict:'correct'|'partial'|'incorrect'|'uncertain';confidence:number;matchedCriteria:string[];feedback:string;provider:string};
export type LocalJudge=(input:{question:string;answer:string;reference:string;rubric:Rubric})=>Promise<LocalJudgeResult>;
export type HybridResult={status:'correct'|'partial'|'incorrect'|'review';confidence:number;feedback:string;source:'rules'|'local-ai'|'fallback';matchedCriteria:string[]};
const clean=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export async function gradeHybrid(test:TestItem,response:string,rubric?:Rubric,judge?:LocalJudge):Promise<HybridResult>{
 const base=evaluateAnswer(test,response);
 if(!response.trim())return{status:'incorrect',confidence:1,feedback:'Écris ta réponse avant de vérifier.',source:'rules',matchedCriteria:[]};
 if(base.status==='correct')return{status:'correct',confidence:1,feedback:base.explanation,source:'rules',matchedCriteria:[]};
 if(base.status==='incorrect'&&test.type!=='short'&&test.type!=='order')return{status:'incorrect',confidence:1,feedback:base.explanation,source:'rules',matchedCriteria:[]};
 if(!rubric||!rubric.criteria.length)return{status:'review',confidence:0,feedback:'Cette réponse nécessite une vérification guidée.',source:'fallback',matchedCriteria:[]};
 const text=clean(response);
 if(rubric.forbiddenClaims?.some(claim=>text.includes(clean(claim))))return{status:'review',confidence:0,feedback:'Une affirmation semble contredire le cours. Relis la correction.',source:'rules',matchedCriteria:[]};
 const matched=rubric.criteria.filter(c=>c.acceptedPhrases.some(phrase=>text.includes(clean(phrase)))).map(c=>c.id);
 const weight=rubric.criteria.reduce((s,c)=>s+c.weight,0);
 const score=rubric.criteria.filter(c=>matched.includes(c.id)).reduce((s,c)=>s+c.weight,0)/Math.max(weight,1);
 if(score===1)return{status:'correct',confidence:0.95,feedback:'Tous les critères attendus sont présents.',source:'rules',matchedCriteria:matched};
 if(judge){try{const ai=await judge({question:test.prompt,answer:response,reference:Array.isArray(test.answer)?test.answer.join(' → '):test.answer,rubric});if(ai.confidence>=Math.max(0.85,rubric.minConfidence)&&ai.verdict!=='uncertain'&&ai.matchedCriteria.every(id=>rubric.criteria.some(c=>c.id===id))){return{status:ai.verdict==='correct'?'review':ai.verdict==='partial'?'partial':'review',confidence:ai.confidence,feedback:ai.feedback,source:'local-ai',matchedCriteria:ai.matchedCriteria}}}catch{/* Offline fallback: no model available. */}}
 return{status:score>0?'partial':'review',confidence:score,feedback:score>0?'Certains éléments sont présents. Complète ta réponse en suivant la correction.':'Compare ta réponse aux critères attendus.',source:'fallback',matchedCriteria:matched};
}
