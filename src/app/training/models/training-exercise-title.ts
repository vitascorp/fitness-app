
export class TrainingExerciseTitle {
    public exerciseId: number;
    public measureId: number;
    public supersetOrder: number;

    constructor(exerciseId: number, measureId: number, supersetOrder: number) {
        this.exerciseId = exerciseId;
        this.measureId = measureId;
        this.supersetOrder = supersetOrder;
    }
}
