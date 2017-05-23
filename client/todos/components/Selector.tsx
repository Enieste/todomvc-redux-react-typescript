import * as React from 'react';

import { Todo } from '../model';

interface SelectorProps {
    todos: Todo[];
}

interface SelectorState {
    selected: string;
    isOpen: boolean;
}

class Selector extends React.Component<SelectorProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            isOpen: false
        };
    }

    openSelector = () => {
        this.setState({
            isOpen: true,
        });
    }

    selectTodo = (text) => {
        this.setState({
            isOpen: false,
            selected: text
        });
    }

    addFilter = (e) => {
        this.setState({
            selected: e.target.value
        });
    }

    filterTodo = () => {
        return this.state.selected ?
            this.props.todos.filter(todo => todo.text.toLowerCase().indexOf(this.state.selected.toLowerCase()) !== -1) : [];
    }

    render() {
        const filteredTodos = this.filterTodo();
        return (<div style={{"height": "200px"}}>
           <input
               style={{"height": "30px"}}
               value={this.state.selected}
               placeholder='Select todo'
               onClick={this.openSelector}
               onChange={this.addFilter}
           />
            { this.state.isOpen ? <div className="list">
                    <ul>
                        { filteredTodos.map((todo, i) => {
                            return <li onClick={() => this.selectTodo(todo.text)} key={i}>{todo.text}</li>
                        })}
                    </ul>
                </div> : false}
        </div>)
    };
}

export default Selector;
