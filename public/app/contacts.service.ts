/**
 * Created by argho on 23.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ContactsService {
    constructor(private http: Http) {
    }

    private contactsUrl = '/contacts';

    getContacts() {
        return this.http.get(this.contactsUrl)
            .map(res => res.json());
    }

}