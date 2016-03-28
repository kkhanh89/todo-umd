import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './app/TodoApp.jsx';
import TodoModel from './app/TodoModel.js';

const model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementsByClassName('todoapp')[0]
  );
}

model.subscribe(render);
render();
