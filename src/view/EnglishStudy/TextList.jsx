import React from 'react';

export default function (props) {

    const name = props.name || '';

    if (props.onClick) {
        return (
            <li onClick={props.onClick}>
                {name}
            </li>
        );
    } else {
        return (
            <li>
                {name}
            </li>
        );
    }
}