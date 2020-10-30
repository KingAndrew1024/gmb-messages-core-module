import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettingsService } from '../providers/global-params';
import { IMessagesRepository, IGmbMessagesApiResponse, IGmbMessageApiProps } from '../core/contracts/IGmbMessages.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
    readonly BASE_URL = `${this.appSettings.getApiUrl()}/api/${this.appSettings.getInstanceName()}/v1/leads`;
    
    constructor(private httpClient: HttpClient,
        private appSettings: AppSettingsService) { }

    getMessages(): Observable<IHttpBasicResponse<IGmbMessagesApiResponse>>{
        //console.log("--- EXECUTING MessagesRepository.getMessages()");
        return this.httpClient.get<IHttpBasicResponse<IGmbMessagesApiResponse>>(`${this.BASE_URL}`)
    }

    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IGmbMessageApiProps>>{
        //console.log("--- EXECUTING MessagesRepository.setMessageAsRead()");

        let data = { lead_id: id }

        let urlSearchParams = new URLSearchParams();
        Object.keys(data).forEach((key: string, i: number) => {
            urlSearchParams.append(key, data[key]);
        });
        const body = urlSearchParams.toString()

        return this.httpClient.post<IHttpBasicResponse<IGmbMessageApiProps>>(`${this.BASE_URL}/mark_message_as_read`, body)
    }
}