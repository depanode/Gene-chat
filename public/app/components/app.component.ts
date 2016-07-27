/**
 * Created by argho on 23.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';

import { ContactList } from './contact-list.component';
import { ChatBlock } from './chat.component';
import { ContactsService } from '../services/contacts.service';
import { MessagesService } from '../services/messages.service';
import { PsDirective } from '../directives/scrollbar.directive';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [ContactList, ChatBlock, PsDirective],
    providers: [ContactsService, HTTP_PROVIDERS, MessagesService]
})

export class AppComponent implements OnInit{
    constructor(private ContactsService: ContactsService,
                private MessagesService: MessagesService) {
    }

    contacts;
    selected;
    lastMessage;
    onfocus: boolean = true;
    messages = [];

    contactChanged(contact) {
        this.selected = contact;
        this.MessagesService.selectContact(contact);
        this.messages = [];
    }

    getContacts() {
        this.ContactsService.getContacts()
            .subscribe(contacts => {
                this.contacts = contacts;
                this.selected = contacts[0];
            });
    }

    onFocus() {
        this.onfocus = true;
        let unseen = this.messages.filter(message => !message.seen);
        unseen.forEach(message => this.makeMessageSeen(message));
    }

    onBlur() {
        this.onfocus = false;
    }

    makeMessageSeen(message) {
        this.MessagesService.makeMessageSeen(message);
    }

    ngOnInit() {
        this.getContacts();
        this.MessagesService.$messages.subscribe(data => {
            this.onfocus && !data.seen ? this.makeMessageSeen(data) : '';
            this.messages.push(data);
        });
        this.MessagesService.socketConnect();
        this.MessagesService.$status.subscribe(data => {
            let index = this.contacts.findIndex(contact => contact._id === data._id);
            this.contacts[index].online = data.online;
        });
    }

}