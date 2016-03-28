import React from 'react';
import classNames from 'classnames';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './TodoApp.jsx';
import style from './TodoFooter.css';
import Utils from './Utils.js';

const TodoFooter = React.createClass({
  render: function () {
    const activeTodoWord = Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className={style['clear-completed']}
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    const nowShowing = this.props.nowShowing;
    return (
      <footer className={style.footer}>
        <span className={style['todo-count']}>
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className={style.filters}>
          <li>
            <a
              href="#/"
              className={classNames({selected: nowShowing === ALL_TODOS})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/active"
              className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
                Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
});

export default TodoFooter;
