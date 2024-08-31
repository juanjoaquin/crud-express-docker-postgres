

export class TodoEntity {
    
    constructor(
        public id: number,
        public text: string,
        public createdAt?: Date|null
    ){}

    get isCompleted() {
        return !!this.createdAt
    }

}