import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {IconButton, TextField} from "@mui/material";

type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemForm) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div style={{display: "flex"
            , alignItems:"center"
            , height: "100px"}}>
            <TextField
                variant={"outlined"}
                label={"Title"}
                size={"small"}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <IconButton
                onClick={addItem}>
                <AddTaskIcon/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};