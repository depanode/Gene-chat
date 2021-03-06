/**
 * Created by argho on 24.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as io from 'socket.io-client';

@Injectable()
export class MessagesService {
    constructor(private http: Http) {
        this.$messages = new Observable(observer => this.messagesObserver = observer);
        this.$scroll = new Observable(observer => this.scrollObserver = observer);
        this.socket = io('http://localhost:3000');
    }

    messages = [];

    socket;
    $messages;
    messagesObserver;
    $scroll;
    scrollObserver;

    socketConnect() {

        let socketid = localStorage.getItem('socketid');

        this.socket.emit('join', {id: localStorage.getItem('socketid')});

        this.socket.on('connected', data => {
            if(!socketid){
                localStorage.setItem('socketid', data.id);
            }
        });

        this.socket.on('recieveMessage', data =>{
            this.messages.push(data);
            this.messagesObserver.next(data);
            this.scrollObserver.next();
        });

        this.socket.on('recieveHistory', data => {
            this.messages = data;
            data.forEach(el => this.messagesObserver.next(el));
            this.scrollObserver.next();
        });
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', {
            'user': localStorage.getItem("soketid"),
            'text': message,
            'authorUser': true
        });
    }

    makeMessageSeen(message) {
        this.socket.emit('makeMessageSeen', message);
        message.seen = Date.now();
    }

}