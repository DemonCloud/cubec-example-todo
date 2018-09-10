import cubec from 'cubec';
import sourceModel from '../models/sourceModel';
import STATUS_CODE from '../define/statuscode';

const trim = cubec.struct.string("trim");

const add = cubec.view({
  name: 'todo-add',

  template: `
    <div class="todo-add">
      <input ref="_input" id="_input" type="text" class="todo-add_input">
      <button id="_confirm" class="todo-add_confirm">ADD+</button>
    </div>
  `,

  events: {
    'click:#_confirm': function(event) {
      let text = trim(this.refs._input.value);

      if (text && text.length) {
        // 生成一条todo
        let todo = {
          text,
          statu: STATUS_CODE.LISTFILTER_UNDO,
          id: Math.random().toString().replace(".","")
        };

        console.log(todo);

        sourceModel.emit('_addTodo', [todo]);

        this.refs._input.value = "";
      }
    },

    'keypress:#_input': function(event){
      if(event.keyCode === 13){
        this.emit("click:#_confirm");
      }
    }
  },
});

export default add;
