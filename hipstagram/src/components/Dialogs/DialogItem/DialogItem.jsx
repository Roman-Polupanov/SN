import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Axel%2C_an_English_bulldog.jpg' className={s.ava} />
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;