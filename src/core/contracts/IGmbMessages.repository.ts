import { Observable } from 'rxjs';

import { IHttpBasicResponse } from './IHttpBasicResponse';

export interface IMessagesRepository {
    getMessages(): Observable<IHttpBasicResponse<IGmbMessagesApiResponse>>;
    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IGmbMessageApiProps>>;
}

export interface IGmbMessagesApiResponse {
    totals: {
        total: number,
        seen: number,
        new: number
    },
    messages: Array<IGmbMessageApiProps>
}

export interface IGmbMessageApiProps{
    message_id: number
    user_name: string
    message: string
    user_email: string
    user_phone: string
    timestamp: string
    read_status: '0' | '1'
}

export type GMB_MESSAGE_TYPE = "ALL" | "READ" | "NEW"; 