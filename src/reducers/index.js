import { combineReducers } from 'redux';
import authReducers from './auth.reducers';
import userReducers from './user.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer';

const combineReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  page: pageReducer
});

export default combineReducer;