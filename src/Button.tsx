import React from 'react'
import {FilterValuesType} from "./App";
import style from "./Todolist.module.css"

type Props = {
    name:string
    callBack: (filter: FilterValuesType) => void
    filter:FilterValuesType

}
export const Button = (props:Props) => {
    const filterGlobalFunction = (filterValue:FilterValuesType) => {
        props.callBack (filterValue)
    }
    return (
        <button
            className={props.name = props.filter ? style.activeFilter : ""}
            onClick={() =>filterGlobalFunction (props.filter)}>
            {props.name}</button>
    );
};