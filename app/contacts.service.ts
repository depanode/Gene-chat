/**
 * Created by argho on 23.07.2016.
 */

import { Injectable } from '@angular/core'

import { Contacts } from './mock/contacts'

@Injectable()
export class ContactsService {

    activeContact;

    getContacts() {
        return Promise.resolve(Contacts);
    }

    setActiveContact(contact) {
        this.activeContact = contact;
    }

}