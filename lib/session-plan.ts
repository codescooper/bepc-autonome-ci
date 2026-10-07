import {dueReviews,GameState} from './gamification';import {Progress,nextIncomplete} from './learning';import {mathsLessons} from './maths-content';
export type DailyStep={id:string;label:string;detail:string;minutes:number;href:string;done:boolean};
export function dailyPlan(game:GameState,progress:Progress):DailyStep[]{const due=dueReviews(game).length;const weak=Object.entries(progress.skills).sort((a,b)=>a[1].score-b[1].score)[0];const next=nextIncomplete(progress,'mathematiques',mathsLessons);const href=next?'/mathematiques/'+next.id+'?mode=guided':'/bepc';return[
{id:'review',label:'Révisions mémoire',detail:due?due+' carte(s) à revoir':'Mémoire à jour',minutes:5,href:'/',done:due===0},
{id:'learn',label:next?'Prochaine notion':'Parcours Maths terminé',detail:next?next.title:'Passer à la consolidation BEPC',minutes:20,href,done:!next},
{id:'practice',label:'Consolidation',detail:weak?'Renforcer : '+weak[0]:'Revoir une leçon librement',minutes:15,href:next?href:'/programme/mathematiques',done:false},
{id:'check',label:'Mini-évaluation',detail:'Vérifier ce qui est retenu sans aide',minutes:5,href:'/bepc',done:false}
]}