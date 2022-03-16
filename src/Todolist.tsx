import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";

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


    const changeFilterHandler = (filterValue: string) => {
        props.tasksFilter(filterValue)
    }


    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}/>
            {/*onChange={(event) => setNewTitle(event.currentTarget.value)}/>*/}
            {/*<button onClick={() =>{props.addTask(newTitle)}}>+</button>*/}

            <Button name={"+"} callBack={addTaskHandler}/>

            {/*<button onClick={addTaskHandler}>+</button>*/}

        </div>
        <ul>
            {props.tasks.map((t: TaskType) => {

                // const removeTaskHandler = () => {
                //     props.removeTask(el.id)
                // }
                return (
                    <li key={t.id}>

                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => onClickHandler(t.id)}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            {/*<button onClick={allFilterHandler}>All</button>*/}
            {/*<button onClick={activeFilterHandler}>Active</button>*/}
            {/*<button onClick={completedFilterHandler}>Completed</button>*/}
            <Button name={"All"} callBack={() => changeFilterHandler("All")}/>
            <Button name={"Active"} callBack={() => changeFilterHandler("Active")}/>
            <Button name={"Completed"} callBack={() => changeFilterHandler("Completed")}/>


            {/*<button onClick={() => changeFilterHandler("All")}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler("Active")}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler("Completed")}>Completed</button>*/}

        </div>
    </div>
}
