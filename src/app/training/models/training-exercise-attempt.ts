
export class TrainingExerciseAttempt {
    public id: number;
    public weight: number;
    public amount: number;
    public order: number;
    public supersetOrder: number;

    constructor(id: number, weight: number, amount: number, order: number, supersetOrder: number) {
        this.id = id;
        this.weight = weight;
        this.amount = amount;
        this.order = order;
        this.supersetOrder = supersetOrder;
    }
}
