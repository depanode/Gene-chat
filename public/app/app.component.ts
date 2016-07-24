/**
 * Created by argho on 23.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';

import { ContactList } from './contact-list.component';
import { ChatBlock } from './chat.component';
import { ContactsService } from './contacts.service';
import { MessagesService } from './messages.service';

@Component({
    selector: 'my-app',
    templateUrl: `app/app.component.html`,
    directives: [ContactList, ChatBlock],
    providers: [ContactsService, HTTP_PROVIDERS, MessagesService]
})

export class AppComponent implements OnInit{
    constructor(private ContactsService: ContactsService,
                private MessagesService: MessagesService) {

    }

    contacts;
    messages;
    selected;

    contactChanged(contact) {
        this.selected = contact;
    }

    getContacts() {
        this.ContactsService.getContacts()
            .subscribe(contacts => {
                this.contacts = contacts;
                this.selected = contacts[0];
            });
    }

    ngOnInit() {
        this.getContacts();
        this.MessagesService.socketConnect();
    }

}