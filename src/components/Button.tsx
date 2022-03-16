import React from 'react';


type Button = {
    name: string;
    callBack: () => void
}
export const Button = (props: Button) => {
    const onClickHandler = () => {
        props.callBack()
    }


    return (

        <button onClick={onClickHandler}>{props.name}</button>

    );
}
