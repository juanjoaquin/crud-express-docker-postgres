import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-doto.dto";



const todos = [
    {id: 1, text: 'Hola pepito', createdAt: new Date()},
    {id: 2, text: 'Hola Juancito', createdAt: new Date()},
    {id: 3, text: 'Hola Cachito', createdAt: new Date()},
]


export class TodosController {

    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {

        const getPrisma = await prisma.todo.findMany()

        if(!getPrisma) return res.status(404).json({error: 'Cannot find all prisma'})
        
        res.json(getPrisma)

        // res.json(todos);
    }

    public getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        // const todoById = todos.find(todo => todo.id === id)

        //Prisma find by ID.
        const findById = await prisma.todo.findUnique({where: {id: id}})
        if(!findById) return res.status(404).json({message: 'Cannot find user'})
        

        if(isNaN(id)) return res.status(400).json({error: 'ID argument spects a number'})

        res.json(findById)

        // if(todoById) {
        //     return res.json(todoById)
        // } else {
        //     return res.status(404).json({error: `Error cannot find id: ${id}`})
        // }
        
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        // const {text} = req.body

        // if(!text) return res.status(400).json({error: 'Text property is required'})

        const todoPrisma = await prisma.todo.create({
            // data: {text}
            data: createTodoDto!
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     createdAt: new Date()
        // }

        // todos.push(newTodo);
        res.json(todoPrisma);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        // if(isNaN(id)) return res.status(400).json({error: 'ID argument spects a number'})

        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) return res.status(400).json({error: 'Cannot find todo'})
        
        // const {text} = req.body;
        const[error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});
        
        if(error) return res.status(400).json({error});

        const findById = await prisma.todo.findUnique({where: {id: id}})
        if(!findById) return res.status(404).json({error: 'Cannot find user'})
        
        const updateTodo = await prisma.todo.update({
            where: {id: id},
            data: updateTodoDto!.values
        });

        res.json(updateTodo)

        
        // if(!text) return res.status(400).json({error: 'Text property is required'});
        // todo.text = text;


        // res.json(todo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        // const todo = todos.findIndex(todo => todo.id === id);
        // if(!todo) return res.status(400).json({error: `Cannot find id: ${id}`});

        const findById = await prisma.todo.findUnique({where: {id}})
        if(!findById) return res.status(404).json({error: 'Cannot find user'})

        await prisma.todo.delete({where: {id: id}})
        
        return res.json({message: 'Todo deleted successfully'})
        // todos.splice(todo, 1)
        // return res.json({message: 'Movie deleted'})
    }

}