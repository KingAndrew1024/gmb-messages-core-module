import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSelector from '../../store/GmbMessages.selectors';
import * as fromActions from '../../store/GmbMessages.actions';
import * as fromReducer from '../../store/GmbMessages.reducer';
import { GMB_MESSAGE_TYPE } from '../../core/contracts/IGmbMessages.repository';


@Injectable()
export class GmbMessagesStore {
    constructor(private store: Store<fromReducer.GmbMessagesState>) { }

    get Loading$() { return this.store.select(fromSelector.getIsLoading) }

    get Error$() {
        return this.store.select(fromSelector.getError);
    }

    loadMessagesPage(sorting?: 'ASC' | 'DESC') {
        return this.store.dispatch(fromActions.GetMessagesBeginAction({ sorting }))
    }

    get MessagesPageData$() {
        return this.store.select(fromSelector.getMessagesPageData);
    }

    filterMessages(criteria: GMB_MESSAGE_TYPE) {
        this.store.dispatch(fromActions.FilterMessagesBeginAction({ messageType: criteria }));
    }
    get FilteredMessages$() {
        return this.store.select(fromSelector.getFilteredMessages);
    }

    MessageById$(messageId: number) {
        this.store.dispatch(fromActions.SelectMessageAction({ messageId }));
        return this.store.select(fromSelector.getMessageById);
    }

    setMessageAsRead(id: number) {
        this.store.dispatch(fromActions.SetMessageAsReadBeginAction({ id }));
    }

    get HasBeenFetched$() {
        return this.store.select(fromSelector.hasBeenFetched);
    }
}