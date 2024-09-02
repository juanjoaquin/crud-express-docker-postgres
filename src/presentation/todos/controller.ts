import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodo, CreateTodoDto, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-doto.dto";




export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getTodos = (req: Request, res: Response) => {

       new GetTodos(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json(error));
    }

    public getById =  (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json(error));        
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)

        .then(createTodo => res.json(createTodo))
        .catch(error => res.status(400).json(error));
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const[error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json(error));
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then((todo) => res.json({data: todo, message: 'Deleted succesfully'}))
        .catch(error => res.status(400).json(error));
    }
}