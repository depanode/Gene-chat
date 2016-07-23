/**
 * Created by argho on 23.07.2016.
 */

import { Component, OnInit } from '@angular/core';

import { ContactList } from './contact-list.component';
import { ChatBlock } from './chat.component';
import { ContactsService } from './contacts.service';

@Component({
    selector: 'my-app',
    templateUrl: `app/app.component.html`,
    directives: [ContactList, ChatBlock],
    providers: [ContactsService]
})

export class AppComponent implements OnInit{
    constructor(private ContactsService: ContactsService) {

    }

    contacts = [];
    selected;

    contactChanged(contact) {
        this.selected = contact;
    }

    getContacts() {
        this.ContactsService.getContacts()
            .then(contacts => {
                this.contacts = contacts;
                this.selected = contacts[0];
            });
    }

    ngOnInit() {
        this.getContacts();
    }

}