import React from 'react';
import './App.css';
import Todos from './components/Todos.js';
import Footer from './components/Footer.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      inputValue: '',
      enteredTodo: [ '', false ],
      xTodosLeft: 0,
      isSelected: { all: 'selected', act: '', com: '' },
      triggClearComplTodos: false
    };
    this.selectAll = this.selectAll.bind(this);
    this.writeTodo = this.writeTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countActiveTodos = this.countActiveTodos.bind(this);
  };

  selectAll() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const todosArr = todosFLC.map(todo => {todo[1] = !this.state.selectAll; return todo;});
    localStorage.setItem("todos", JSON.stringify(todosArr));
    this.countActiveTodos();
    this.setState({ selectAll: !this.state.selectAll });
  };

  writeTodo(event) { this.setState({ inputValue: event.target.value })};

  handleSubmit(event) {
    event.preventDefault();
    const enteredValue = this.state.inputValue.trim();
    if (enteredValue) {
      this.setState({
        enteredTodo: [enteredValue, !this.state.enteredTodo[1]],
        inputValue: ''
      });
    };
  };

  countActiveTodos() {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const todosArr = todosFLC ? todosFLC : [];
    let actTodNum = 0;
    if (todosArr.length > 0) {
      todosArr.forEach(todo => { if (!todo[1]) { actTodNum++ } });
    };
    this.setState({ xTodosLeft: actTodNum })
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
              selectAll={this.state.selectAll}
              enteredTodo={this.state.enteredTodo}
              whichIsSelected={this.state.isSelected}
              countActiveTodos={this.countActiveTodos}
              handleClearCompletedTodos={this.state.triggClearComplTodos}
            />
          </section>
          <Footer
            xTodosLeft={this.state.xTodosLeft}
            triggerShowAllTodos={() => {this.setState({ isSelected: { all: 'selected', act: '', com: ''}})}}
            triggerShowActiveTodos={() => {this.setState({ isSelected: { all: '', act: 'selected', com: ''}})}}
            triggerShowCompletedTodos={() => {this.setState({ isSelected: { all: '', act: '', com: 'selected'}})}}
            triggClearComplTodos={() => {this.setState({ triggClearComplTodos: !this.state.triggClearComplTodos })}}
          />
        </section>
      </div>
    );
  };
};

export default App;
