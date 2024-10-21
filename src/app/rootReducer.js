// rootReducer.js
import { combineReducers } from 'redux';
import exampleReducer from './reducers';

const rootReducer = combineReducers({
  example: exampleReducer, // Đảm bảo tên này đúng
  // thêm các reducer khác nếu cần
});

export default rootReducer;
