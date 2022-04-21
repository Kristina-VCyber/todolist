import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

// type Tasks

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }





    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }


    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)
            });
    }





    function addTodolist(title: string) {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTodolistFilter(todolistId: string, filter: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        setTodolists(todolists.map(el => el.id === todolistId ? {
            ...el, title
        } : el))
    }


    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))



        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }



    const todoListComponents = todolists.map(el => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
        }


        return (
            <Grid item key={el.id}>
                <Paper style={{display: "inline-block"}}>
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <WidgetsOutlinedIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container justifyContent={"center"}>
                    <div>
                        <AddItemForm addItem={addTodolist}/>
                    </div>
                </Grid>
                <Grid container spacing={6}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>

    );


}

export default App;
