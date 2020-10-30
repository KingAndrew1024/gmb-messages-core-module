import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGmbMessagesService } from '../core/contracts/IGmbMessages.service';
import { GmbMessagesRepository } from '../repositories/GmbMessages.repository';
import { GmbMessagesPageModel, GmbMessageModel } from '../core/models/GmbMessage.model';



@Injectable()
export class GmbMessagesService implements IGmbMessagesService {
    constructor(private repository: GmbMessagesRepository,
        /*private errorHandler: RepositoryErrorHandler*/) { }

    getMessages(sorting?: 'ASC' | 'DESC'): Observable<GmbMessagesPageModel> {

        return this.repository.getMessages().pipe(
            map(response => {
                //this.errorHandler.handle(response);

                let messages = !sorting ?
                    response.data.messages
                        .map(m => GmbMessageModel.fromApiResponse(m)) :
                    response.data.messages
                        .map(m => GmbMessageModel.fromApiResponse(m))
                        .sort((a, b) => {
                            return sorting == 'ASC' ?
                                b.timestamp.localeCompare(a.timestamp) :
                                a.timestamp.localeCompare(b.timestamp);
                        });

                return new GmbMessagesPageModel({
                    totals: {
                        total: response.data.totals.total,
                        read: response.data.totals.seen,
                        new: response.data.totals.new
                    },
                    messages
                })
            })
        )
    }

    setMessageAsRead(id: number): Observable<GmbMessageModel> {
        return this.repository.setMessageAsRead(id).pipe(
            map(response => {

                //this.errorHandler.handle(response);

                return GmbMessageModel.fromApiResponse(response.data)
            })
        )
    }

}