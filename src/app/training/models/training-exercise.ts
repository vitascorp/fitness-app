import { TrainingExerciseAttempt } from './training-exercise-attempt';
import { TrainingExerciseTitle } from './training-exercise-title';

export class TrainingExercise {
    public id: number;
    public order: number;
    public titles: TrainingExerciseTitle[];
    public attempts: TrainingExerciseAttempt[];
}
