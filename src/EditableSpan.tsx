import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    classes: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode ?
            <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeHandler}/>
            : <span
                className={props.classes}
                style = {{"fontWeight": "bold"}}
                onDoubleClick={onEditMode}


            >{props.title}</span>
    );
};

