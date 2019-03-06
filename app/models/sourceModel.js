import cubec from 'cubec';
import filterModel from './filterModel';
import STATUS_CODE from '../define/statuscode';

const _eachArray = cubec.struct.each('array');
const _findIndex = cubec.struct.index();

const sourceModel = cubec.model({
  name: 'sourceModel',

  url: '/getTodoList',

  data: {
    nodes: [],
  },

  events: {
    init() {
      this.fetch();
    },

    // 当资源模型发生了变化时
    // 会连带对筛选模型进行触发操作
    change() {
      let filterNodes = this.get('nodes');
      let statu = filterModel.get('filterStatu');

      // 是否需要进行筛选
      if (statu !== STATUS_CODE.LISTFILTER_ALL) {
        let newNodes = [];

        _eachArray(filterNodes, node => {
          if (statu === node.statu) newNodes.push(node);
        });

        filterNodes = newNodes;
      }

      // 筛选模型获得正确todo条数
      filterModel.set('filterNodes', filterNodes);

      // this.sync("/syncTodoList");
    },

    // 成功同步到服务器
    "sync:success": function(){
      alert("同步成功");
    },

    // 新增一条todo
    _addTodo(todo) {
      let nodes = this.get('nodes');

      nodes.push(todo);

      this.set('nodes', nodes);
    },

    // 完成一条todo
    _completeTodo(id) {
      let nodes = this.get(`nodes`);

      let index = _findIndex(nodes, function(node) {
        return node.id === id;
      });

      let target = this.get(`nodes.${index}`);

      // 修改当前条目的状态
      target.statu = STATUS_CODE.LISTFILTER_COMPLETE;

      this.set(`nodes.${index}`, target);
    },

    // 删除一条todo
    _deleteTodo(id) {
      let nodes = this.get('nodes');

      let index = _findIndex(nodes, function(node) {
        return node.id === id;
      });

      // 剔除一条找到的条目
      nodes.splice(index, 1);

      this.set('nodes', nodes);
    },

    // 重新筛选todo
    _filterTodo(statu) {
      // 优先设置筛选模型的状态, 从而触发状态改变
      filterModel.set('filterStatu', statu);

      // 主动触发一次change事件根据状态进行重新筛选
      this.push("change");
    },
  },
});

export default sourceModel;
