import { Observable } from 'rxjs';

import { GmbMessageModel } from '../models/GmbMessage.model';

export interface IGmbMessagesService{
    getMessages(sorting?: 'ASC' | 'DESC'): Observable<any>;
    setMessageAsRead(id: number): Observable<GmbMessageModel>;
}