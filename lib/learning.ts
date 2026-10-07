export type Activity = {
  id: string;
  lesson: string;
  skill: string;
  type: string;
  difficulty: number;
  prompt: string;
  answer?: string;
  answer_criteria?: string[];
  explanation: string;
  verification_status: string;
};

export type SkillState = { attempts: number; correct: number; score: number };
export type Progress = { completed: string[]; skills: Record<string, SkillState> };

export const emptyProgress: Progress = { completed: [], skills: {} };

export function loadProgress(): Progress {
  if (typeof window === 'undefined') return emptyProgress;
  try {
    return JSON.parse(localStorage.getItem('bepc-progress-v2') || JSON.stringify(emptyProgress));
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem('bepc-progress-v2', JSON.stringify(progress));
}

export function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\s/g, '')
    .replaceAll('×', '*')
    .replaceAll('²', '^2')
    .replaceAll('−', '-')
    .replace(/^[a-z]=/, '')
    .replaceAll('*', '');
}

export function recordAttempt(progress: Progress, skill: string, ok: boolean): Progress {
  const previous = progress.skills[skill] || { attempts: 0, correct: 0, score: 0 };
  const attempts = previous.attempts + 1;
  const correct = previous.correct + (ok ? 1 : 0);

  return {
    ...progress,
    skills: {
      ...progress.skills,
      [skill]: {
        attempts,
        correct,
        score: Math.round((correct / attempts) * 100),
      },
    },
  };
}

export function lessonKey(subject:string,lesson:string){return subject+':'+lesson}
export function completeLesson(progress:Progress,subject:string,lesson:string):Progress{const key=lessonKey(subject,lesson);return progress.completed.includes(key)?progress:{...progress,completed:[...progress.completed,key]}}
export function isLessonCompleted(progress:Progress,subject:string,lesson:string){return progress.completed.includes(lessonKey(subject,lesson))}
export function nextIncomplete<T extends {id:string}>(progress:Progress,subject:string,lessons:T[]){return lessons.find(l=>!isLessonCompleted(progress,subject,l.id))||null}

export function recommendation(score: number) {
  if (score < 50) return 'Revoir l’explication et faire une remédiation';
  if (score < 70) return 'Continuer les exercices guidés';
  if (score < 85) return 'Passer aux exercices de consolidation';
  return 'Prêt pour un entraînement type BEPC';
}
