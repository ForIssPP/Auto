import React from 'react';
import ReactDOM from 'react-dom';
import TextList from './TextList.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNavBar() {
        const { navBarMap } = this.props;

        if (!navBarMap) {
            return <div></div>;
        } else {
            return navBarMap.map(({ name, onClick, className }, index) => {
                return <TextList class_name={className} key={index} name={name} onClick={onClick} />
            });;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand bg-light ">
                <ul className="navbar-nav">
                    {this.renderNavBar()}
                </ul>
            </nav>
        )
    }
}