import {createAction, createActionGroup, createFeature, emptyProps, props} from "@ngrx/store";
import {UserInterface} from "../../interfaces/user.interface";
import {ConversationInterface} from "../../interfaces/conversation.interface";
import {SendMessageInterface} from "../../interfaces/sendMessage.interface";

export const USER_AUTH = "USER_AUTH"
export const USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS"
export const USER_AUTH_FAIL = "USER_AUTH_FAIL"


export const userAuth = createActionGroup({
  source: "auth",
  events: {
    "user Auth": props<{username: string, password: string}>(),
    "user Auth Fail": props<{error: string}>(),
    "user Auth Success": props<UserInterface>()
  }
})

export const userSignUp = createActionGroup({
  source: "signUp",
  events: {
    "user Signup": props<{username: string, password: string}>(),
    "user Signup Fail": props<{error: string}>(),
    "user Signup Success": props<UserInterface>()
  }
})

export const fetchCommunity = createActionGroup({
  source: "fetchCommunity",
  events: {
    "fetch Community": emptyProps,
    "fetch Community Fail": props<{error: string}>(),
    "fetch Community Success": props<{community: UserInterface[]}>()
  }
})

export const fetchUser = createActionGroup({
  source: "fetchUser",
  events: {
    "fetch User": props<{ id: number }>(),
    "fetch User Fail": props<{error: string}>(),
    "fetch User Success": props<UserInterface>()
  }
})

export const sendMessage = createActionGroup({
  source: "sendMessage",
  events: {
    "send Message": props<SendMessageInterface>(),
    "send Message Fail": props<{error: string}>(),
    "send Message Success": props<{conversations: ConversationInterface[]}>()
  }
})

export const createConversation = createActionGroup({
  source: "createConversation",
  events: {
    "create Conversation": props<SendMessageInterface>(),
    "create Conversation Fail": props<{error: string}>(),
    "create Conversation Success": props<{conversations: ConversationInterface[]}>()
  }
})

export const userLogout = createAction("User Logout");
