import { combineReducers } from 'redux';
import User from '../user/user_reducer';
import main from '../main/main_reducer';
import Checkin from '../checkin/checkin_reducer';
import { store } from './store';
import authenticationReducer from 'redux_manager/authentication/authenticationReducer';



export default combineReducers({
 
  user: User,
  authentication: authenticationReducer,
  main: main,
  checkin: Checkin,
 
});
export type RootState = ReturnType<typeof store.getState>;
