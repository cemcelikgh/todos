import React from 'react';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xItemsLeft: 0,
      isSelected: {
        all: "selected",
        actives: "",
        completedTodos: ""
      }
    };
    this.showAll = this.showAll.bind(this);
    this.showActives = this.showActives.bind(this);
    this.showCompletedTodos = this.showCompletedTodos.bind(this);
  };

  showAll() {
    const todoListItems = document.querySelectorAll('.todo-list li');
    todoListItems.forEach(todo => todo.style.display='list-item');
    this.setState({
      isSelected: {
        all: "selected",
        actives: "",
        completedTodos: ""
      }
    });
  };

  showActives() {
    const todoListItems = [...document.querySelectorAll('.todo-list li')];
    const todoListItemsInputs = [...document.querySelectorAll('.todo-list li input')];
    const activeListItems = todoListItems.filter((todo, index) => todoListItemsInputs[index].checked);
    todoListItems.forEach(todo => todo.style.display='list-item');
    activeListItems.forEach(todo => todo.style.display='none');
    this.setState({
      isSelected: {
        all: "",
        actives: "selected",
        completedTodos: ""
      }
    });
  };

  showCompletedTodos() {
    const todoListItems = [...document.querySelectorAll('.todo-list li')];
    const todoListItemsInputs = [...document.querySelectorAll('.todo-list li input')];
    const completedListItems = todoListItems.filter((todo, index) => !todoListItemsInputs[index].checked);
    todoListItems.forEach(todo => todo.style.display='list-item');
    completedListItems.forEach(todo => todo.style.display='none');
    this.setState({
      isSelected: {
        all: "",
        actives: "",
        completedTodos: "selected"
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.xItemsLeft !== this.props.xItemsLeft) {
      this.setState({ xItemsLeft: this.props.xItemsLeft });
    };
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.state.xItemsLeft}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a
              id='all'
              href="#/"
              className={this.state.isSelected.all}
              onClick={this.showAll}
            >All</a>
          </li>
          <li>
            <a
              id='active'
              href="#/"
              className={this.state.isSelected.actives}
              onClick={this.showActives}
            >Active</a>
          </li>
          <li>
            <a
              id='complated'
              href="#/"
              className={this.state.isSelected.completedTodos}
              onClick={this.showCompletedTodos}
            >Completed</a>
          </li>
        </ul>
        <button
        className="clear-completed"
        onClick={this.props.clearCompletedTodosBtn}
        >
          Clear completed
        </button>
      </footer>
    );
  };
};

export default Footer;
