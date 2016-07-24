/**
 * Created by argho on 23.07.2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var messages_service_1 = require('./messages.service');
var ChatBlock = (function () {
    function ChatBlock(MessagesService) {
        this.MessagesService = MessagesService;
    }
    ChatBlock.prototype.sendMessage = function () {
        if (/\S/.test(this.message)) {
            this.MessagesService.sendMessage((this.message));
            this.message = '';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatBlock.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatBlock.prototype, "messages", void 0);
    ChatBlock = __decorate([
        core_1.Component({
            selector: 'chat-block',
            templateUrl: 'app/chat.component.html'
        }), 
        __metadata('design:paramtypes', [messages_service_1.MessagesService])
    ], ChatBlock);
    return ChatBlock;
}());
exports.ChatBlock = ChatBlock;
//# sourceMappingURL=chat.component.js.map