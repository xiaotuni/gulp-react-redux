/**
 * Created by admin on 2016-07-13.
 */
import Utility from '../../Common/Utility';

const __Base = 'Exodus/XO/SubTask/';
const Load = __Base + 'Load';
const LoadFail = __Base + 'LoadFail';

const __API = __Base + 'API/';
const APIGetValues = __API + 'GetValues';                        // 子任务列表


const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  let __Result = { ...state };
  if (action.result) {      // 这里就是请求完成了
    Object.assign(__Result, { loading: false, loaded: true });
    __Result.Result = action.result;
  }
  if (action.error) {     // 请求完了之后出错信息
    Object.assign(__Result, { loading: false, loaded: false });
    __Result.Error = action.error;
  }
  switch (action.type) {
    case APIGetValues:                                                          // 子任务列表
      __Result.Values = action.result;
      break;
    case LoadFail:                                                                       // 失败
      break;
    default:
  }
  return __Result;
}

/**
 * 我的任务集合
 * 
 * @export
 * @param {Object} Condition 条件
 * @returns 
 */
export function onAPIGetValues(Condition) {
  return {
    types: [Load, APIGetValues, LoadFail],
    promise: (client) => client.get(client.API.GetValues),
    Condition
  };
}
