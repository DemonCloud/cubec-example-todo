import cubec from 'cubec';
import STATUS_CODE from '../define/statuscode';

// 筛选模型
const filterModel = cubec.model({
  name: 'filterModel',

  data: {
    filterStatu: STATUS_CODE.LISTFILTER_ALL,
    filterNodes: [],
  },

});

export default filterModel;
