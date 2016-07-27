/**
 * Created by argho on 23.07.2016.
 */

import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { ContactsService } from '../services/contacts.service';
import { MessagesService } from '../services/messages.service';
import { filterContactsBy } from '../pipes/contacts-filter';

@Component({
    selector: 'contact-list',
    templateUrl: 'app/components/contact-list.component.html',
    pipes: [filterContactsBy]
})

export class ContactList implements OnInit{
    constructor(private ContactsService: ContactsService,
                private MessagesService: MessagesService){

    }

    onlyOnline: boolean = false;
    nameContains: string = '';

    contacts;
    selected;
    selectedContact;

    @Output()
    contactSelected = new EventEmitter();

    showOnline(online) {
        this.onlyOnline = online;
    }

    selectContact(contact) {
        if(this.selectedContact === contact) {
            return;
        }
        this.selectedContact = contact;
        this.contactSelected.emit(contact);
        this.ContactsService.selectContact(contact);
    }

    getContacts() {
        this.ContactsService.getContacts()
            .subscribe(contacts => {
                this.contacts = contacts;
                this.selectContact(contacts[0]);
            });
    }

    ngOnInit() {
        this.getContacts();
        this.ContactsService.getStatuses();
        this.ContactsService.$status.subscribe(data => {
            let index = this.contacts.findIndex(contact => contact._id === data._id);
            this.contacts[index].online = data.online;
        });
    }

}