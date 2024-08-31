import { CreateTodoDto } from "../dtos/todos/create-doto.dto";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDatasource {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

}