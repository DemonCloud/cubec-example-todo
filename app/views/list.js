import cubec from 'cubec';
import sourceModel from '../models/sourceModel';
import STATUS_CODE from '../define/statuscode';

const list = cubec.view({
  name: 'todo-list',

  props: STATUS_CODE,

  template: `
    <ul class="todo-list">
      {{*each [node, i] in filterNodes}}
      <li>
        <span class="{{#node.statu === LISTFILTER_UNDO ? 'todo-list_undo' : 'todo-list_complete'}}" _nid={{#node.id}} >{{-node.text}}</span>
        <button class="todo-list_delete" _nid={{#node.id}} >×</button>
      </li>
      {{*/}}
    </ul>
  `,

  events: {
    // 点击一条未完成的todo
    'click:.todo-list_undo': function(event) {
      let target = event.target;

      sourceModel.emit('_completeTodo', [target._nid]);
    },

    // 点击删除一条todo
    'click:.todo-list_delete': function(event) {
      event.preventDefault();
      event.stopPropagation();

      let target = event.target;

      sourceModel.emit('_deleteTodo', [target._nid]);
    },
  },
});

export default list;
