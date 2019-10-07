import { TrainingExercise } from './training-exercise';
import { TrainingCardio } from './training-cardio';

export class Training {
    public id: number;
    public date: Date;
    public categoryId: number;
    public categoryName: string;
    public weight: number;
    public cardio: TrainingCardio;
    public exercises: TrainingExercise[];
}
