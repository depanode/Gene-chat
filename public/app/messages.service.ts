/**
 * Created by argho on 24.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as io from 'socket.io-client';

@Injectable()
export class MessagesService {
    constructor(private http: Http) {
        this.$messages = new Observable(observer => this.messagesObserver = observer);
    }

    messages = [];

    socket;
    messagesObserver;
    $messages;

    socketConnect() {

        let socketid = localStorage.getItem('socketid');

        this.socket = io('http://localhost:3000');

        this.socket.emit('join', {id: localStorage.getItem('socketid')});

        this.socket.on('connected', function(data){
            if(!socketid){
                localStorage.setItem('socketid', data.id);
            }
        });

        this.socket.on('recieveMessage', (data) =>{
            this.messages.push(data);
            this.messagesObserver.next(this.messages);
            this.PsDirective.scrollDown();
        });

        this.socket.on('recieveHistory', data => {
            this.messages = data;
            this.messagesObserver.next(this.messages);
        });
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', {
            'user': localStorage.getItem("soketid"),
            'text': message
        });
    }

    selectContact(contact) {
        this.socket.emit('changeContact', contact);
    }

}