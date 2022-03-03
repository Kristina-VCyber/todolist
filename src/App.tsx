import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export function Counter () {
    let arr = useState(5);
    let data = arr[0];
    let setData = arr[1];
    return <div onClick={ () => { setData(data + 1)} }>{data}</div>

}




function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},

    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} task={tasks1}/>
            <Todolist title={"What to improve"} task={tasks2}/>
        </div>
    );
}

export default App;
