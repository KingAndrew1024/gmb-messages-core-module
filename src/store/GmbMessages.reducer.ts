import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './GmbMessages.actions';
import { GmbMessagesPageModel, GmbMessageModel } from '../core/models/GmbMessage.model';
import { IGmbMessagesStateError, IGmbMessagesStateSuccess } from '../core/contracts/IStateErrorSuccess';


export interface GmbMessagesState {
    isLoading: boolean
    hasBeenFetched: boolean
    pageData: GmbMessagesPageModel
    filteredItems: GmbMessageModel[]
    selectedId: number
    error: IGmbMessagesStateError,
    success: IGmbMessagesStateSuccess
}

export const initialState: GmbMessagesState = {
    isLoading: false,
    hasBeenFetched: false,
    pageData: GmbMessagesPageModel.empty(),
    filteredItems: [],
    selectedId: null,
    error: null,
    success: null
}

const reducer = createReducer(
    initialState,

    //On Begin Actions
    on(fromActions.GetMessagesBeginAction, (state): GmbMessagesState => ({
        ...state,
        error: null,
        success: null,
        isLoading: true
    })),

    //ON Success Actions
    on(fromActions.GetMessagesSuccessAction, (state, action): GmbMessagesState => ({
        ...state,
        isLoading: false,
        hasBeenFetched: true,
        pageData: {
            ...state.pageData,
            totals: action.data.totals,
            messages: action.data.messages
        },
        error: null,
        success: null
    })),
    on(fromActions.SetMessageAsReadSuccessAction, (state, action): GmbMessagesState => ({
        ...state,
        pageData: {
            ...state.pageData,
            totals: {
                ...state.pageData.totals,
                read: state.pageData.totals.read + 1,
                new: state.pageData.totals.new - 1
            },
            messages: [
                ...((ml) => {
                    let tmp = [...ml];
                    
                    const idx = ml.findIndex((m) => m.messageId == action.message.messageId);

                    if(idx !== -1)
                        tmp.splice(idx, 1, action.message)
                    
                    return tmp;
                })(state.pageData.messages),
            ],
            //chartPoints: [...state.pageData.chartPoints]*/
        },
        error: null,
        success: { after: getSuccessActionType(action.type) }
    })),

    //ON Fail Actions
    on(fromActions.GetMessagesFailAction, (state, action): GmbMessagesState => ({
        ...state,
        isLoading: false,
        error: { after: getErrorActionType(action.type), error: action.errors }
    })),
    on(fromActions.SetMessageAsReadFailAction, (state, action): GmbMessagesState => ({
        ...state,
        error: { after: getErrorActionType(action.type), error: action.errors },
    })),

    //FILTER
    on(fromActions.FilterMessagesSuccessAction, (state, action): GmbMessagesState => ({
        ...state,
        filteredItems: action.messageList,
        success: null
    })),

    //SELECT
    on(fromActions.SelectMessageAction, (state, action): GmbMessagesState => ({
        ...state,
        selectedId: action.messageId,
        success: null
    })),
)

function getErrorActionType(type: fromActions.GmbMessagesActionTypes) {

    let action: "GET" | "SET_READ" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.GmbMessagesActionTypes.GetMessagesFail:
            action = "GET"; break;
        case fromActions.GmbMessagesActionTypes.SetMessageAsReadFail:
            action = "SET_READ"; break;
    }

    return action;
}

function getSuccessActionType(type: fromActions.GmbMessagesActionTypes) {

    let action: "GET" | "SET_READ" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.GmbMessagesActionTypes.GetMessagesSuccess:
            action = "GET"; break;
        case fromActions.GmbMessagesActionTypes.SetMessageAsReadSuccess:
            action = "SET_READ"; break;
    }

    return action;
}

export function gmbMessagesReducer(state: GmbMessagesState | undefined, action: Action) {
    return reducer(state, action);
}