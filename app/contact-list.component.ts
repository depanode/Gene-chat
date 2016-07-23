/**
 * Created by argho on 23.07.2016.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { filterContactsBy } from './pipes/contacts-filter';

@Component({
    selector: 'contact-list',
    templateUrl: `app/contact-list.component.html`,
    pipes: [filterContactsBy]
})

export class ContactList{

    constructor(){

    }

    onlyOnline: boolean = false;
    nameContains: string = ''; //TODO filter by name

    selectedContact;

    @Input() contacts;

    @Output() contactSelected = new EventEmitter();

    showOnline(online) {
        this.onlyOnline = online;
    }

    selectContact(contact) {
        this.selectedContact = contact;
        this.contactSelected.emit(contact);
    }

}