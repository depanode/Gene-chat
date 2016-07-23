/**
 * Created by argho on 23.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Contacts } from './mock/contacts'

@Injectable()
export class ContactsService {

    constructor(private http: Http) {

    }

    private contactsUrl = '/contacts';

    activeContact;

    getContacts() {
        //return Promise.resolve(Contacts);
        return this.http.get(this.contactsUrl)
            .map(res => res.json());
    }

    setActiveContact(contact) {
        this.activeContact = contact;
    }

}