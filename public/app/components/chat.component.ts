/**
 * Created by argho on 23.07.2016.
 */

import { Component, Input, OnInit } from '@angular/core';

import { MessagesService } from '../services/messages.service';
import { PsDirective } from '../directives/scrollbar.directive';

@Component({
    selector: 'chat-block',
    templateUrl: 'app/components/chat.component.html',
    directives: [PsDirective]
})

export class ChatBlock implements OnInit{
    constructor(private MessagesService: MessagesService) {

    }

    message;
    messages = [];
    onfocus: boolean = true;

    @Input()
    selected;

    onFocus() {
        this.onfocus = true;
        let unseen = this.messages.filter(message => !message.seen);
        unseen.forEach(message => this.makeMessageSeen(message));
    }

    onBlur() {
        this.onfocus = false;
    }

    makeMessageSeen(message) {
        this.MessagesService.makeMessageSeen(message);
    }

    sendMessage() {
        if (/\S/.test(this.message)) {
            this.MessagesService.sendMessage(this.message);
            this.message = '';
        }
    }

    ngOnInit() {
        this.MessagesService.$messages.subscribe(data => {
            this.onfocus && !data.seen ? this.makeMessageSeen(data) : '';
            this.messages.push(data);
        });
    }

}