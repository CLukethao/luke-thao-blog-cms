import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserInterface} from "../../interfaces/user.interface";
import {userState} from "./user.state";
import {BlogInterface} from "../../interfaces/blog.interface";
import {ConversationInterface} from "../../interfaces/conversation.interface";



const getUserState = createFeatureSelector<UserInterface>('user');
export const getUser = createSelector(getUserState, (state) => {

  return {username: state.username, id: state.id}

});

export const getUsername = createSelector(getUserState, (state) => {

  return state.username

});

export const getUserId = createSelector(getUserState, (state) => {

  return state.id

});

export const getConversations = createSelector(getUserState, (state) => {

  return {conversations: state.conversations, username: state.username}

});

export const getCommunity = createSelector(getUserState, (state) => {

  return {community: state.community, userId: state.id}

});

export const getConversationById = (conversationId: number) => createSelector(getUserState, (state) => {

  return state.conversations.find((conversation: ConversationInterface) => conversation.id === conversationId) as ConversationInterface

});
