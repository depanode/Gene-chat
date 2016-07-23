/**
 * Created by argho on 23.07.2016.
 */

import { Component, Input, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';

@Component({
    selector: 'chat-block',
    templateUrl: 'app/chat.component.html'
})

export class ChatBlock{
    constructor() {

    }

    @Input() selected;


}