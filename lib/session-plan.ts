import {dueReviews,GameState} from './gamification';import {Progress} from './learning';
export type DailyStep={id:string;label:string;detail:string;minutes:number;href:string;done:boolean};
export function dailyPlan(game:GameState,progress:Progress):DailyStep[]{const due=dueReviews(game).length;const weak=Object.entries(progress.skills).sort((a,b)=>a[1].score-b[1].score)[0];return [
{id:'review',label:'Révisions mémoire',detail:due?due+' carte(s) à revoir':'Mémoire à jour',minutes:5,href:'/',done:due===0},
{id:'learn',label:'Nouvelle notion',detail:weak?'Consolider : '+weak[0]:'Commencer le parcours Maths',minutes:20,href:'/mathematiques/calcul-litteral',done:false},
{id:'practice',label:'Exercices',detail:'S’entraîner jusqu’à 80 % de maîtrise',minutes:15,href:'/mathematiques/calcul-litteral',done:false},
{id:'check',label:'Mini-évaluation',detail:'Vérifier ce qui est retenu sans aide',minutes:5,href:'/bepc',done:false}
]}