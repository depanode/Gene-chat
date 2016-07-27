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
    constructor(private MessagesService: MessagesService) {
    }

    selected;

    contactChanged(contact) {
        this.selected = contact;
        this.MessagesService.selectContact(contact);
    }

    ngOnInit() {
        this.MessagesService.socketConnect();
    }

}