import React from 'react';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xTodosLeft: this.props.xTodosLeft,
      isSelected: { all: 'selected', act: '', com: '' }
    };
    this.handleShowAllTodos = this.handleShowAllTodos.bind(this);
    this.handleShowActiveTodos = this.handleShowActiveTodos.bind(this);
    this.handleShowCompletedTodos = this.handleShowCompletedTodos.bind(this);
    this.xTodosCompleted = this.xTodosCompleted.bind(this);
  };

  handleShowAllTodos () {
    this.props.triggerShowAllTodos();
    this.setState({isSelected: { all: 'selected', act: '', com: ''}});
  };

  handleShowActiveTodos () {
    this.props.triggerShowActiveTodos();
    this.setState({isSelected: { all: '', act: 'selected', com: ''}});
  };

  handleShowCompletedTodos () {
    this.props.triggerShowCompletedTodos();
    this.setState({isSelected: { all: '', act: '', com: 'selected'}});
  };

  xTodosCompleted () {
    const todosFLC = JSON.parse(localStorage.getItem("todos"));
    const todosArr = todosFLC ? todosFLC : [];
    let comTodNum = 0;
    if (todosArr.length > 0) {
      todosArr.forEach(todo => { if (todo[1]) { comTodNum++ } });
    };
    return comTodNum;
  };

  componentDidUpdate (prevProps) {
    if (prevProps.xTodosLeft !== this.props.xTodosLeft) {
      this.setState({ xTodosLeft: this.props.xTodosLeft });
    };
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.state.xTodosLeft}</strong>
          {this.state.xTodosLeft === 1 ? ' item left' : ' items left'}
        </span>
        <ul className="filters">
          <li id='all'
            onClick={this.handleShowAllTodos}
            className={this.state.isSelected.all}
            >All
          </li>
          <li id='active'
            onClick={this.handleShowActiveTodos}
            className={this.state.isSelected.act}
            >Active
          </li>
          <li id='completed'
            onClick={this.handleShowCompletedTodos}
            className={this.state.isSelected.com}
            >Completed
          </li>
        </ul>
        {this.xTodosCompleted() > 0 ?
        <button className="clear-completed"
          onClick={this.props.triggClearComplTodos}
        >Clear completed
        </button>
        : null
        }
      </footer>
    );
  };
};

export default Footer;
