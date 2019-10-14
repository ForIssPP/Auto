import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import NavBar from './NavBar.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const names = [
            '词类和句类',
            '词语',
            '时态',
            '语态',
            '语气',
            '句子成分',
            '句型结构',
        ];
        const navBarNames = names.map(name => <a href="#">{name}</a>);

        this.state = {
            navBarNames
        };
    }

    barListClick(i) {
        return () => console.log(i);
    }

    render() {
        const barListClicks = [...new Array(10).keys()].map((i => this.barListClick(i)));
        const navBarMap = barListClicks.map((onClick, i) => {
            const name = this.state.navBarNames[i];

            return {
                onClick,
                name
            }
        });

        return (
            <div className="container">
                <h1>English 语法汇总 demo</h1>
                <NavBar navBarMap={navBarMap} />
            </div>
        );
    }
}