import cubec from 'cubec';
import sourceModel from '../models/sourceModel';
import STATUS_CODE from '../define/statuscode';

const status = cubec.view({
  name: 'todo-status',

  props: STATUS_CODE,

  template: `
    <div class="todo-status">
      <div class="todo-status_left">
        <span class="todo-status_counter">{{#filterNodes.length}}</span>
      </div>
      <div class="todo-status_center">
        <span class="todo-status_statu {{#filterStatu === LISTFILTER_ALL ? "active" : ""}}"
          _key={{-LISTFILTER_ALL}} >ALL</span>
        <span class="todo-status_statu {{#filterStatu === LISTFILTER_UNDO ? "active" : ""}}"
          _key={{-LISTFILTER_UNDO}} >UNDO</span>
        <span class="todo-status_statu {{#filterStatu === LISTFILTER_COMPLETE ? "active" : ""}}"
          _key={{-LISTFILTER_COMPLETE}} >COMPLETE</span>
      </div>
      <div class="todo-status_right">
        <button class="todo-status_sync">sync</button>
      </div>
    </div>
  `,

  events: {
    'click:.todo-status_statu': function(event) {
      event.preventDefault();
      event.stopPropagation();

      let target = event.target;

      sourceModel.emit('_filterTodo', [parseInt(target._key)]);
    },

    'click:.todo-status_sync': function(event) {
      // sourceModel.sync("/syncTodoList");
    },
  },
});

export default status;
