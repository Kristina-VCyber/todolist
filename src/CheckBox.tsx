import React, {ChangeEvent} from "react";

type CheckBox = {
    tIsDone:boolean
    callBack: (currentEvent:boolean) => void
}


export const CheckBox = (props:CheckBox) => {
    const checkBoxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={props.tIsDone}
               onChange={checkBoxHandler}/>
    )
}
