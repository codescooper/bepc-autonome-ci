export type ReviewCard={id:string;front:string;back:string;skill:string;subject:string;due:string;interval:number;ease:number;repetitions:number};
export type GameState={xp:number;streak:number;lastStudyDay:string|null;reviews:ReviewCard[];history:{date:string;score:number;skill:string}[]};
export const emptyGame:GameState={xp:0,streak:0,lastStudyDay:null,reviews:[],history:[]};
export function loadGame():GameState{if(typeof window==='undefined')return emptyGame;try{return {...emptyGame,...JSON.parse(localStorage.getItem('bepc-game-v1')||'{}')}}catch{return emptyGame}}
export function saveGame(g:GameState){localStorage.setItem('bepc-game-v1',JSON.stringify(g))}
const day=(d=new Date())=>d.toISOString().slice(0,10);const addDays=(n:number)=>{const d=new Date();d.setDate(d.getDate()+n);return day(d)};
export function reward(g:GameState,correct:boolean,skill:string):GameState{const today=day(),y=new Date();y.setDate(y.getDate()-1);const streak=g.lastStudyDay===today?g.streak:g.lastStudyDay===day(y)?g.streak+1:1;return {...g,xp:g.xp+(correct?10:2),streak,lastStudyDay:today,history:[...g.history,{date:new Date().toISOString(),score:correct?100:0,skill}].slice(-300)}}
export function scheduleCard(g:GameState,card:Omit<ReviewCard,'due'|'interval'|'ease'|'repetitions'>):GameState{if(g.reviews.some(r=>r.id===card.id))return g;return {...g,reviews:[...g.reviews,{...card,due:day(),interval:1,ease:2.5,repetitions:0}]}}
export function gradeReview(g:GameState,id:string,quality:0|1|2|3):GameState{return {...g,reviews:g.reviews.map(c=>{if(c.id!==id)return c;let reps=c.repetitions,interval=c.interval,ease=c.ease;if(quality<2){reps=0;interval=1}else{reps++;interval=reps===1?1:reps===2?3:Math.max(1,Math.round(interval*ease));ease=Math.max(1.3,ease+(quality===3?.1:quality===2?0:-.15))}return {...c,repetitions:reps,interval,ease,due:addDays(interval)}})}}
export function dueReviews(g:GameState,limit=5){const today=day();return g.reviews.filter(c=>c.due<=today).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,limit)}
export function level(xp:number){return Math.floor(xp/100)+1}
