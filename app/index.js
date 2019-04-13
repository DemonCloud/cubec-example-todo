import './index.css';
import cubec from 'cubec';

import filterModel from './models/filterModel';

import add from './views/add';
import list from './views/list';
import status from './views/status';

const App = cubec.view({
  name: 'App',

  connect: filterModel,

  template: `
    <slot>components.add</slot>
    <slot>components.list</slot>
    <slot>components.status</slot>
  `,

  components: {
    add,
    list,
    status,
  },
});

// 挂载（启动）主视图
App.mount(document.getElementById('app'), filterModel);
