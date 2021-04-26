import React from 'react';

export default function Message(props){
    return(
        <div className='messageBox'>
            <h5>{props.username}</h5>
            <p>{props.content}</p>
            <em>{props.timestamp}</em>
        </div>
    )
}