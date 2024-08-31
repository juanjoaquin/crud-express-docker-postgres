export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
    ){}


    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;

        return returnObj
    }

    static create(props: {[key:string]: any }): [string?, UpdateTodoDto?] {

        const {text, id} = props;
        if(!id || isNaN(Number(id))) {
            return ['id must be a valid number']
        }

        // if(!text) return ['Text property is required', undefined];

        return[undefined, new UpdateTodoDto(id, text)]
    }
}