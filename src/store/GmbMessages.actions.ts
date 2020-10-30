import { createAction, props } from '@ngrx/store'
import { GmbMessagesPageModel, GmbMessageModel } from '../core/models/GmbMessage.model'
import { GMB_MESSAGE_TYPE } from '../core/contracts/IGmbMessages.repository'



export enum GmbMessagesActionTypes {
    GetMessagesBegin = "[GmbMessages] Get Messages begin",
    GetMessagesSuccess = "[GmbMessages] Get Messages success",
    GetMessagesFail = "[GmbMessages] Get Messages failure",

    SetMessageAsReadBegin = "[GmbMessages] Set Messages as Read begin",
    SetMessageAsReadSuccess = "[GmbMessages] Set Messages as Read success",
    SetMessageAsReadFail = "[GmbMessages] Set Messages as Read failure",

    FilterMessagesBegin = "[GmbMessages] Filter message begin",
    FilterMessagesSuccess = "[GmbMessages] Filter message success",

    SelectMessage = "[GmbMessages] Select message",
}

// GET Messages from remote API
export const GetMessagesBeginAction = createAction(
    GmbMessagesActionTypes.GetMessagesBegin,
    props<{sorting?: 'ASC' | 'DESC'}>()
)

export const GetMessagesSuccessAction = createAction(
    GmbMessagesActionTypes.GetMessagesSuccess,
    props<{ data: GmbMessagesPageModel }>()
)

export const GetMessagesFailAction = createAction(
    GmbMessagesActionTypes.GetMessagesFail,
    props<{ errors: any }>()
)

//SET AS READ
export const SetMessageAsReadBeginAction = createAction(
    GmbMessagesActionTypes.SetMessageAsReadBegin,
    props<{ id: number }>()
)

export const SetMessageAsReadSuccessAction = createAction(
    GmbMessagesActionTypes.SetMessageAsReadSuccess,
    props<{ message: GmbMessageModel }>()
)

export const SetMessageAsReadFailAction = createAction(
    GmbMessagesActionTypes.SetMessageAsReadFail,
    props<{ errors: any }>()
)

// FILTERING
export const FilterMessagesBeginAction = createAction(
    GmbMessagesActionTypes.FilterMessagesBegin,
    props<{ messageType: GMB_MESSAGE_TYPE }>()
)

export const FilterMessagesSuccessAction = createAction(
    GmbMessagesActionTypes.FilterMessagesSuccess,
    props<{ messageList: GmbMessageModel[] }>()
)

export const SelectMessageAction = createAction(
    GmbMessagesActionTypes.SelectMessage,
    props<{ messageId: number }>()
)