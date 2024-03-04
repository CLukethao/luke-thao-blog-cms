import {createReducer, on} from "@ngrx/store";
import {
  createConversation,
  fetchCommunity,
  fetchUser,
  sendMessage,
  userAuth,
  userLogout,
  userSignUp
} from "./user.actions";
import {userState} from "./user.state";



export const userReducer = createReducer( userState,

  on(userAuth.userAuthSuccess, (state, props) => {
    return {
      ...state, username: props.username, id: props.id, conversations: props.conversations
    }
  }),

  on(userSignUp.userSignupSuccess, (state, props) => {
    return {
      ...state, username: props.username, id: props.id
    }
  }),

  on(userLogout, (state) => {
    return {
      ...state, username: null, id: null, conversations: []
    }
  }),

  on(fetchCommunity.fetchCommunitySuccess, (state, props) => {
    return {
      ...state, community: props.community
    }
  }),

  on(fetchUser.fetchUserSuccess, (state, props) => {
    return {
      ...state,    username: props.username, id: props.id, conversations: props.conversations
    }
  }),

  on(sendMessage.sendMessageSuccess, (state, props) => {
    return {
      ...state, conversations: props.conversations
    }
  }),

  on(createConversation.createConversationSuccess, (state, props) => {
    return {
      ...state, conversations: props.conversations
    }
  }),

  on(userAuth.userAuthFail, (state, props) => {
    alert("Invalid Login")
    return {
      ...state
    }
  }),

  on(userSignUp.userSignupFail, (state, props) => {
    alert("Username taken")
    return {
      ...state
    }
  }),


)
