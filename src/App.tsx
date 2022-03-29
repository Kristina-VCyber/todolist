import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()


    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistId_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId_2]: [
                {id: v1(), title: "Sugar", isDone: true},
                {id: v1(), title: "Salt", isDone: true},
                {id: v1(), title: "Oil", isDone: false},
                {id: v1(), title: "Grecha", isDone: false},
                {id: v1(), title: "Bitcoin", isDone: false},
            ]
        }
    )




    function removeTask(taskId: string, todolistId: string) {

        const tasksFromTodolist = tasks[todolistId]
        const filteredTasks = tasksFromTodolist.filter(t => t.id !== taskId);
        const copyTasks = {...tasks}
        copyTasks[todolistId] = filteredTasks
        setTasks(copyTasks)

        // const filteredTasks = tasks.filter(t => t.id !== id);

    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        // const newTask = {id: v1(),title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })

        // const updatedTasksFromTodolist = tasks[todolistId].map(t=> t.id===taskId ? {...t, isDone}:t)
        // const copyTasks = {...tasks}
        // copyTasks [todolistId] = updatedTasksFromTodolist
        // setTasks(copyTasks)
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl));
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTask = {...tasks}
        delete copyTask[todolistId]
        setTasks(copyTask)
    }


    const todolistComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                removeTodolist={removeTodolist}

            />


        )

    })


    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
