import React from 'react';

class Todos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  this.handleToggle = this.handleToggle.bind(this);
  this.handleDestroy = this.handleDestroy.bind(this);
  this.addTodo = this.addTodo.bind(this);
  };

  handleToggle(event) {
    const todosArr = [...this.state.todos];
    const listItemID = event.target.parentElement.parentElement.id;
    todosArr[listItemID][1] = !todosArr[listItemID][1];
    this.setState({ todos: todosArr });
    localStorage.setItem("todos", JSON.stringify(todosArr));
  }

  handleDestroy(event) {
    const todos = this.state.todos;
    const listItemID = Number(event.target.parentElement.parentElement.id);
    const remainedTodos = todos.filter(todo => todos.indexOf(todo) !== listItemID);
    this.setState({ todos: remainedTodos });
    localStorage.setItem("todos", JSON.stringify(remainedTodos));
    this.props.howManyItemsLeft();
  }

  addTodo() {
    const todosArr = [...this.state.todos];
    todosArr.push([this.props.newTodo, false]);
    this.setState( { todos: todosArr } );
    localStorage.setItem("todos", JSON.stringify(todosArr));
    this.props.howManyItemsLeft();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.newTodo !== this.props.newTodo) {
      this.addTodo();
    };
    if (prevProps.selectAll !== this.props.selectAll) {
      const todosArr = this.state.todos.map(todo => {todo[1] = this.props.selectAll; return todo;});
      this.setState({ todos: todosArr });
      localStorage.setItem("todos", JSON.stringify(todosArr));
    };
    if (prevProps.clearCompletedTodos !== this.props.clearCompletedTodos) {
      const todosFLC = JSON.parse(localStorage.getItem("todos"));
      const activeTodos = todosFLC.filter(todo => !todo[1])
      this.setState({ todos: activeTodos });
    };
  };

  componentDidMount() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    this.setState({
      todos: todosFLC ? todosFLC : []
    });
    this.props.howManyItemsLeft();
  };

  render() {
    return (
      <ul className="todo-list">
      {this.state.todos.map((todo, index) => (
        <li className={todo[1] ? 'completed' : ''}
          id={index}
          key={index}
          >
          <div className='view'>
            <input
              className='toggle'
              id={'todo' + index}
              type='checkbox'
              checked={todo[1]}
              readOnly
              onClick={this.handleToggle}
              />
            <label
              htmlFor={'todo' + index}
            >{todo[0]}</label>
            <button
              className='destroy'
              onClick={this.handleDestroy}
            ></button>
          </div>
        </li>
      ))}
      </ul>
    );
  };
};

export default Todos;
