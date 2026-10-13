import type {Rubric} from './hybrid-grader';
// First audited rubrics. Extend only after checking against teacher-reviewed answers.
export const gradingRubrics:Record<string,Rubric>={
 'f-short':{questionId:'f-short',minConfidence:0.9,criteria:[
 {id:'point',label:"Point d’application",weight:1,acceptedPhrases:["point d'application","point d application"]},
 {id:'direction',label:'Direction',weight:1,acceptedPhrases:['direction']},
 {id:'sens',label:'Sens',weight:1,acceptedPhrases:['sens']},
 {id:'intensite',label:'Intensité',weight:1,acceptedPhrases:['intensite','intensité']}
 ]},
 'ta-short':{questionId:'ta-short',minConfidence:0.95,criteria:[
 {id:'benefice',label:'Un bénéfice explicite de la lecture',weight:1,acceptedPhrases:['vocabulaire','comprehension','compréhension','connaissances','imagination','orthographe','expression','culture generale','culture générale']}
 ]}
};
export const rubricFor=(id:string)=>gradingRubrics[id];
