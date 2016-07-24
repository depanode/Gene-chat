/**
 * Created by argho on 23.07.2016.
 */

import { Component, Input, OnInit } from '@angular/core';

import { MessagesService } from './messages.service';

@Component({
    selector: 'chat-block',
    templateUrl: 'app/chat.component.html'
})

export class ChatBlock{
    constructor(private MessagesService: MessagesService) {

    }

    message;

    @Input()
    selected;

    @Input()
    messages;

    sendMessage() {
        this.MessagesService.sendMessage((this.message));
        this.message = '';
    }

}