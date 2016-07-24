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
    messages = [];

    socketConnect() {
        let socketid = localStorage.getItem('socketid');
        this.socket = io('http://localhost:3000');
        this.socket.on('connected', function(data){
            if(!socketid){
                localStorage.setItem('socketid', data.id);
            }
        });
        this.socket.emit('join', {id: localStorage.getItem('socketid')});
        this.socket.on('recieveMessage', function(data) {
            console.log(this);
            this.messages.push(data);
        }.bind(this));
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', {
            'user': localStorage.getItem("soketid"),
            'text': message
        });
    }

}