import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export function Todolist(props: PropsType) {

    const [valueButton, setValueButton] = useState('All')

    const tasksFilter = (filterValue: string) => {
        console.log(filterValue)
        setValueButton(filterValue)
    }

    let tasksForRender = props.tasks

    if (valueButton === "Active") {
        tasksForRender = props.tasks.filter(el => el.isDone === false)
    }
    if (valueButton === "Completed") {
        tasksForRender = props.tasks.filter(el => el.isDone === true)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksForRender.map((el, index) => {

                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)
            })}
        </ul>
        <div>
            <button onClick={() => tasksFilter("All")}>All</button>
            <button onClick={() => tasksFilter("Active")}>Active</button>
            <button onClick={() => tasksFilter("Completed")}>Completed</button>
        </div>
    </div>
}
