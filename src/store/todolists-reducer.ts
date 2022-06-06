import {FilterValuesType, TodolistType} from '../App';
import {v1} from "uuid";

type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}


export type ActionType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


// REDUCER
export const todolistsReducer =
    (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {

        switch (action.type) {

            case "ADD-TODOLIST":
                const newTodolistId = v1()
                const newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'}
                return [...todolists, newTodolist]

            case "REMOVE-TODOLIST":
                return todolists.filter(el => el.id !== action.id)
            case "CHANGE-TODOLIST-TITLE":
                return todolists.map(el => el.id === action.id
                    ? {...el, title: action.title} : el)
            case "CHANGE-TODOLIST-FILTER":
                return todolists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
            default:
                return todolists
        }

    }

// ACTION CREATOR

export const addTodolistActionCreator = (title: string): AddTodolistActionType => ({type: "ADD-TODOLIST", title})
export const removeTodolistActionCreator = (id: string): RemoveTodolistActionType => ({type: "REMOVE-TODOLIST", id})
export const changeTodolistTitleActionCreator = (id: string, title: string,): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})
export const changeTodolistFilterActionCreator = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})