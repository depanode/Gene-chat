/**
 * Created by argho on 24.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import * as io from 'socket.io-client';

@Injectable()
export class MessagesService {
    constructor(private http: Http) {

    }

    socket = null;

    socketConnect() {
        this.socket = io('http://localhost:3000');
        this.socket.on('joined', function(data){
            localStorage.setItem('soketid', data.id);
        });
        this.socket.emit('join', {id: localStorage.getItem('soketid')});
        this.socket.on('chatUpdate', function(data) {
            this.conversation.push(data);
        }.bind(this));
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', {
            'user': localStorage.getItem("soketid"),
            'text': message
        });
    }

}