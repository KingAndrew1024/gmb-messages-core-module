import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './GmbMessages.reducer';

export const getMessagesState = createFeatureSelector<fromReducer.GmbMessagesState>('gmbMessages');

export const _getPageData = (state: fromReducer.GmbMessagesState) => state.pageData;
export const _getIsLoading = (state: fromReducer.GmbMessagesState) => state.isLoading;
export const _getMessages = (state: fromReducer.GmbMessagesState) => state.pageData.messages;
export const _getFilteredItems = (state: fromReducer.GmbMessagesState) => state.filteredItems;

export const getMessagesPageState = createSelector(
    getMessagesState,
    state => state
);

export const getMessagesPageData = createSelector(
    getMessagesState,
    _getPageData
);

export const getMessages = createSelector(
    getMessagesPageState,
    _getMessages
)

export const getIsLoading = createSelector(
    getMessagesPageState,
    _getIsLoading
)

export const getError = createSelector(
    getMessagesPageState,
    state => state.error
)

export const getFilteredMessages = createSelector(
    getMessagesPageState,
    _getFilteredItems
)

export const getMessageById = createSelector(
    getMessagesPageState,
    state => state.pageData.messages.filter(m => +m.messageId == state.selectedId)[0]
)

export const hasBeenFetched = createSelector(
    getMessagesPageState,
    state => state.hasBeenFetched
)