/**
 * Created by argho on 23.07.2016.
 */

import { Component, Input } from '@angular/core';

import { MessagesService } from '../services/messages.service';
import { PsDirective } from '../directives/scrollbar.directive';

@Component({
    selector: 'chat-block',
    templateUrl: 'app/components/chat.component.html',
    directives: [PsDirective]
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
        if (/\S/.test(this.message)) {
            this.MessagesService.sendMessage(this.message);
            this.message = '';
        }
    }

}