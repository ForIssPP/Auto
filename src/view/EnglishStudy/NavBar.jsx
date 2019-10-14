import React from 'react';
import ReactDOM from 'react-dom';
import TextList from './TextList.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNavBar() {
        const reList = this.props.navBarMap.map(({name, onClick, className}, index) => {
            return <TextList className={className} key={index} name={name} onClick={onClick} />
        });

        return reList;
    }

    render() {
        return (
            <div className="nav-bar">
                <ul>
                    {this.renderNavBar()}
                </ul>
            </div>
        )
    }
}