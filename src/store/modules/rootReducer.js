import { combineReducers } from 'redux';
import calendarDate from './calendarDate/reducer';
import userSession from './userSession/reducer';

export default combineReducers({
    calendarDate,
    userSession,
})