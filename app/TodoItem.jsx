import React from 'react';
import classNames from 'classnames';
import style from './TodoItem.css';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

const TodoItem = React.createClass({
  handleSubmit: function (event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    }
  },

  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value});
    }
  },

  getInitialState: function () {
    return {editText: this.props.todo.title};
  },

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  },

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  },

  render: function () {
    const { todo, editing } = this.props;
    return (
      <li className={classNames({
        [style.todo]: true,
        [style.editing]: editing
      })}>
        <div className={classNames({[style.hidden]: editing})}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={this.props.onToggle}
          />
          <label className={classNames({
            [style.label]: true,
            [style.completed]: todo.completed
          })} onDoubleClick={this.handleEdit}>
            {todo.title}
          </label>
          <button className={style.destroy} onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className={classNames({
            [style.hidden]: !editing,
            [style.edit]: editing
          })}
          value={this.state.editText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
});

export default TodoItem;
