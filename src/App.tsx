import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [task, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])


    const removeTask = (newId: number) => {
        setTask(task.filter(el => el.id !== newId))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={task}
                      removeTask={removeTask}
            />

        </div>
    );
}

export default App;
