import React from 'react';

class Todos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.showTodos = this.showTodos.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.showAllTodos = this.showAllTodos.bind(this);
    this.showActiveTodos = this.showActiveTodos.bind(this);
    this.showCompletedTodos = this.showCompletedTodos.bind(this);
    this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
  };

  handleAdd() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const arrOfID = todosFLC.map(todo => parseInt(todo[2]));
    let todoID;
    for (let i = 0; i < arrOfID.length + 1; i++) {
      if (!arrOfID.includes(i + 1)) { todoID = i + 1; break; }
    };
    const todosArr = [...todosFLC, [this.props.enteredTodo[0], false, todoID]];
    localStorage.setItem("todos", JSON.stringify(todosArr));
    this.props.countActiveTodos(); this.showTodos();
  };

  handleToggle(event) {
    const todosArr = JSON.parse(localStorage.getItem("todos"));
    const listItemID = parseInt(event.target.parentElement.id.slice(-1));
    for (let i = 0; i < todosArr.length + 1; i++) {
      if (todosArr[i][2] === listItemID) {
        todosArr[i][1] = !todosArr[i][1];
        break;
      };
    };
    localStorage.setItem("todos", JSON.stringify(todosArr));
    this.props.countActiveTodos(); this.showTodos();
  };

  handleDestroy(event) {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const listItemID = parseInt(event.target.parentElement.id.slice(-1));
    const remainedTodos = todosFLC.filter(todo => todo[2] !== listItemID);
    localStorage.setItem("todos", JSON.stringify(remainedTodos));
    this.props.countActiveTodos(); this.showTodos();
  };

  showAllTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    this.setState({ todos: todosFLC });
  };

  showActiveTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const activeTodos = todosFLC.filter(todo => !todo[1]);
    this.setState({ todos: activeTodos });
  };

  showCompletedTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const completedTodos = todosFLC.filter(todo => todo[1]);
    this.setState({ todos: completedTodos });
  };

  showTodos() {
    if (this.props.whichIsSelected.all === 'selected') {
      this.showAllTodos();
    } else if (this.props.whichIsSelected.act === 'selected') {
      this.showActiveTodos();
    } else if (this.props.whichIsSelected.com === 'selected') {
      this.showCompletedTodos();
    };
  };

  clearCompletedTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const remainedTodos = todosFLC.filter(todo => !todo[1]);
    localStorage.setItem("todos", JSON.stringify(remainedTodos));
    this.props.countActiveTodos();
    this.showTodos();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectAll !== this.props.selectAll) {
      this.showTodos();
    };
    if (prevProps.enteredTodo[1] !== this.props.enteredTodo[1]) {
      this.handleAdd();
    };
    if (this.props.whichIsSelected.all === 'selected'
      && prevProps.whichIsSelected.all !== this.props.whichIsSelected.all) {
      this.showAllTodos();
    } else if (this.props.whichIsSelected.act === 'selected'
      && prevProps.whichIsSelected.act !== this.props.whichIsSelected.act) {
      this.showActiveTodos();
    } else if (this.props.whichIsSelected.com === 'selected'
      && prevProps.whichIsSelected.com !== this.props.whichIsSelected.com) {
      this.showCompletedTodos();
    };
    if (prevProps.handleClearCompletedTodos !== this.props.handleClearCompletedTodos) {
      this.clearCompletedTodos();
    };
  };

  componentDidMount() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const todosArr = todosFLC ? todosFLC : []
    localStorage.setItem("todos", JSON.stringify(todosArr));
    this.setState({ todos: todosArr });
    this.props.countActiveTodos();
  };

  render() {
    return (
      <ul className="todo-list">
      {this.state.todos.map((todo) => (
        <li id={'todo-' + todo[2]} key={todo[2]}
          className={todo[1] ? 'completed' : ''}
        >
          <input id={'todo_' + todo[2]}
            className='toggle'
            type='checkbox'
            checked={todo[1]}
            readOnly
            onClick={this.handleToggle}
          />
          <label htmlFor={'todo_' + todo[2]}
            >{todo[0]}
          </label>
          <button
            className='destroy'
            onClick={this.handleDestroy}
          ></button>
        </li>
      ))}
      </ul>
    );
  };
};

export default Todos;
