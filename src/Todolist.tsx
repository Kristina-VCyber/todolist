import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    tasksFilter: (filterValue: string) => void
    removeTask: (id: string) => void
    addTask: (newTitle: string) => void
}


export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState("")

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle("")
    }
    console.log(newTitle)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter") {
            addTaskHandler()
        }
    }


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }


    // const allFilterHandler = () => {
    //     props.tasksFilter("All")
    // }
    // const activeFilterHandler = () => {
    //     props.tasksFilter("Active")
    // }
    // const completedFilterHandler = () => {
    //     props.tasksFilter("Completed")
    // }
    //



    const filterHandler = (filterValue:string) => {
        props.tasksFilter (filterValue)
    }


    const removeTaskHandler = (elId: string) => {
        props.removeTask(elId)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}/>
            {/*onChange={(event) => setNewTitle(event.currentTarget.value)}/>*/}
            {/*<button onClick={() =>{props.addTask(newTitle)}}>+</button>*/}

            <button onClick={addTaskHandler}>+</button>

        </div>
        <ul>
            {props.tasks.map((el: TaskType) => {

                // const removeTaskHandler = () => {
                //     props.removeTask(el.id)
                // }
                return (
                    <li key={el.id}>
                        <button onClick={() => removeTaskHandler(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            {/*<button onClick={allFilterHandler}>All</button>*/}
            {/*<button onClick={activeFilterHandler}>Active</button>*/}
            {/*<button onClick={completedFilterHandler}>Completed</button>*/}

            <button onClick={() => filterHandler ("All")}>All</button>
            <button onClick={() => filterHandler ("Active")}>Active</button>
            <button onClick={() => filterHandler ("Completed")}>Completed</button>
        </div>
    </div>
}
