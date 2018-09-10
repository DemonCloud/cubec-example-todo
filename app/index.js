import './index.css';
import cubec from 'cubec';

import filterModel from './models/filterModel';

import add from './views/add';
import list from './views/list';
import status from './views/status';

const App = cubec.view({
  name: 'App',

  template: `
    <slot>components.add::filterModel</slot>
    <slot>components.list::filterModel</slot>
    <slot>components.status::filterModel</slot>
  `,

  models: {
    filterModel,
  },

  components: {
    add,
    list,
    status,
  },

  events: {
    completeRender() {
      // 让视图和模型形成链接关系
      // this.components.add.connect(filterModel);
      this.components.list.connect(filterModel);
      this.components.status.connect(filterModel);
    },
  },
});

// 挂载（启动）主视图
App.mount(document.getElementById('app'), App.models);
