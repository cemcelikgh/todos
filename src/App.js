import React from 'react';
import './App.css';
import Todos from './Todos';
import Footer from './Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      newTodo: '',
      xItemsLeft: 0,
      clearCompletedCP: 0,
      selectAll: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.writeTodo = this.writeTodo.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.howManyItemsLeft = this.howManyItemsLeft.bind(this);
    this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
  };

  handleSubmit(event) {
    event.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const enteredValue = todoInput.value.trim();
    if (enteredValue) {
      this.setState({
        newTodo: enteredValue,
        inputValue: ''
      });
    };
  };

  writeTodo(event) {
    this.setState({
      inputValue: event.target.value
    });
  };

  selectAll() {
    this.setState({ selectAll: !this.state.selectAll });
  };

  howManyItemsLeft() {
    const todoNumber = JSON.parse(localStorage.getItem("todos")).length;
    this.setState({ xItemsLeft: todoNumber })
  }

  clearCompletedTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const remainedTodos = todosFLC.filter(todo => !todo[1]);
    localStorage.setItem("todos", JSON.stringify(remainedTodos));
    this.setState({ clearCompletedCP: this.state.clearCompletedCP + 1 });
    this.howManyItemsLeft();
  };

  render() {
    return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                className="new-todo"
                id="todo-input"
                placeholder="What needs to be done?"
                value={this.state.inputValue}
                onChange={this.writeTodo}
              />
            </form>
          </header>
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              />
            <label
              htmlFor="toggle-all"
              onClick={this.selectAll}
            >
              Mark all as complete
            </label>
            <Todos
              newTodo={this.state.newTodo}
              howManyItemsLeft={this.howManyItemsLeft}
              selectAll={this.state.selectAll}
              clearCompletedTodos={this.state.clearCompletedCP}
            />
          </section>
          <Footer
            xItemsLeft={this.state.xItemsLeft}
            clearCompletedTodosBtn={this.clearCompletedTodos}
          />
        </section>
      </div>
    );
  };
};

export default App;
