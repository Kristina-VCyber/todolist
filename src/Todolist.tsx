import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void

    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title);
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistId, newTitle)

    return <div>
        <Typography style={{textAlign:"center"}} variant={"h5"}>

            <EditableSpan title={props.title}
                          classes = {""}
                          changeTitle={changeTodolistTitle}/>
            <IconButton onClick={() => props.removeTodolist(props.todolistId)}
                        size={"small"}>
                <DeleteOutlineIcon/>
            </IconButton>

        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(props.todolistId, t.id, newTitle,)

                    // return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    return <ListItem
                        style = {{padding: "0"}}
                        key={t.id} >
                        <Checkbox
                            size={"small"}
                            color={"secondary"}
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      classes = {t.isDone ? "is-done" : ""}
                                      changeTitle={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler} size={"small"}><DeleteOutlineIcon/></IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>

            <ButtonGroup
                size={"small"}
                variant={"contained"}
                disableElevation
            >
                <Button
                    color={props.filter === "all" ? "secondary" : "primary"}
                    // disableElevation = {props.filter === 'all' ? true : false}
                    disableElevation
                    onClick={onAllClickHandler}>All
                </Button>
                <Button

                    color={props.filter === "active" ? "secondary" : "primary"}
                    disableElevation
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button

                    color={props.filter === "completed" ? "secondary" : "primary"}
                    disableElevation
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>


    </div>
}
