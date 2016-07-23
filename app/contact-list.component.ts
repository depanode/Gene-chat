/**
 * Created by argho on 23.07.2016.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { filterContactsBy } from './pipes/contacts-filter';

@Component({
    selector: 'contact-list',
    templateUrl: `app/contact-list.component.html`,
    providers: [ContactsService],
    pipes: [filterContactsBy]
})

export class ContactList implements OnInit{

    constructor(private ContactsService: ContactsService){

    }

    contacts = [];

    onlyOnline: boolean = false;
    nameContains: string = ''; //TODO filter by name

    showOnline(online) {
        this.onlyOnline = online;
    }

    getContacts() {
        this.ContactsService.getContacts()
            .then(contacts => this.contacts = contacts);
    }

    ngOnInit() {
        this.getContacts();
    }

}