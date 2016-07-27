/**
 * Created by argho on 23.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { MessagesService } from '../services/messages.service';
//import * as io from 'socket.io-client';

@Injectable()
export class ContactsService {
    constructor(private http: Http,
                private MessagesService: MessagesService) {
        this.socket = this.MessagesService.socket;
        this.$status = new Observable(observer => this.statusObserver = observer);
    }

    socket;
    $status;
    statusObserver;

    private contactsUrl = '/contacts';

    getContacts() {
        return this.http.get(this.contactsUrl)
            .map(res => res.json());
    }

    getStatuses() {
        this.socket.on('botStatus', data => {
            this.statusObserver.next(data);
        });
    }

    selectContact(contact) {
        this.socket.emit('changeContact', contact);
    }

}