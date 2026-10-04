import {recommendation,SkillState} from '../lib/learning';
export default function MasteryCard({name,state}:{name:string,state?:SkillState}){const score=state?.score??0;return <div className="mastery"><div><b>{name}</b><small>{state?.attempts||0} tentative(s)</small></div><div className="ring">{score}%</div><p>{state?.attempts?recommendation(score):'Pas encore évalué'}</p></div>}
