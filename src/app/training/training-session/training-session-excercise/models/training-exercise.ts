import { TrainingExerciseAttempt } from './training-exercise-attempt';

export class TrainingExercise {
    public id: number;
    public exerciseId: number;
    public measureId: number;
    public order: number;
    public supersetOrder: number;
    public attempts: TrainingExerciseAttempt[];
}
