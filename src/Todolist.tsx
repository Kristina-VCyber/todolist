import React from "react";

type TodolistPropsType = {
    title: string;
    task: Array<TaskPropsType>

}
type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((el) => {
                        debugger
                        return (
                            <li><input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => alert (el.id) }>x</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}




