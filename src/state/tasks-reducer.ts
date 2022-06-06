import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId:string

}

export type AddTasksActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId:string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone:boolean
    todolistId:string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title:string
    todolistId:string
}


type ActionsType = RemoveTaskActionType | AddTasksActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType |RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }


        case 'ADD-TASK':

            return {
                ...state,
                [action.todolistId]:[{id: v1(),title:action.title, isDone:false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':

            return {
                ...state,
                [action.todolistId]:  state [action.todolistId].map(task => task.id === action.taskId ? {...task,isDone:action.isDone}:task)

            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:  state [action.todolistId].map(task => task.id === action.taskId ? {...task,title:action.title}:task)

            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [v1()]:[]
            }
        case 'REMOVE-TODOLIST':
           //  let copyState = {...state}
           // delete copyState [action.id]
            let {[action.id]:[], ...rest} = {...state}
            // return copyState
            return rest
        default:
            throw new Error("I don't understand this type")

    }
}

export const removeTaskAC = (taskId: string,todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId,todolistId }
}
export const addTaskAC = (title: string,todolistId: string): AddTasksActionType => {
    return {type: 'ADD-TASK', title,todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS',taskId, isDone,todolistId }
}
export const changeTaskTitleAC = (taskId: string, title:string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE',taskId, title,todolistId}
}


// export const removeTaskAC = (taskId: string,todolistId: string) => ({type: 'REMOVE-TASK', taskId,todolistId }) as const

    // export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

