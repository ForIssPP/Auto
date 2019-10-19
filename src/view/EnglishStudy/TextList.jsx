import React from 'react';

export default function (props) {

    const {name, class_name} = props;

    if (props.onClick) {
        return (
            <li onClick={props.onClick} className={class_name}>
                {name}
            </li>
        );
    } else {
        return (
            <li className={class_name}>
                {name}
            </li>
        );
    }
}