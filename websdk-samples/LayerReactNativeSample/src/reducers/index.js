import { combineReducers } from 'redux';
import appReducer from './appReducer';
import activeConversationReducer from './activeConversationReducer';
import participantReducer from './participantReducer';
import announcementReducer from './announcementReducer';

const rootReducer = combineReducers({
  app: appReducer,
  activeConversation: activeConversationReducer,
  participantState: participantReducer,
  announcementState: announcementReducer,
});

export default rootReducer;
