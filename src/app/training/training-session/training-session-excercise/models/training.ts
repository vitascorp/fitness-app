import { TrainingExercise } from './training-exercise';

export class Training {
    public id: number;
    public date: Date;
    public categoryId: number;
    public exercises: TrainingExercise[];
}
