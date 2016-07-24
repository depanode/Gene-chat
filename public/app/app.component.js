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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var contact_list_component_1 = require('./contact-list.component');
var chat_component_1 = require('./chat.component');
var contacts_service_1 = require('./contacts.service');
var messages_service_1 = require('./messages.service');
var scrollbar_directive_1 = require('./directives/scrollbar.directive');
var AppComponent = (function () {
    function AppComponent(ContactsService, MessagesService) {
        this.ContactsService = ContactsService;
        this.MessagesService = MessagesService;
    }
    AppComponent.prototype.contactChanged = function (contact) {
        this.selected = contact;
        this.MessagesService.selectContact(contact);
    };
    AppComponent.prototype.getContacts = function () {
        var _this = this;
        this.ContactsService.getContacts()
            .subscribe(function (contacts) {
            _this.contacts = contacts;
            _this.selected = contacts[0];
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getContacts();
        this.MessagesService.$messages.subscribe(function (data) { return _this.messages = data; });
        this.MessagesService.socketConnect();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: "app/app.component.html",
            directives: [contact_list_component_1.ContactList, chat_component_1.ChatBlock, scrollbar_directive_1.PsDirective],
            providers: [contacts_service_1.ContactsService, http_1.HTTP_PROVIDERS, messages_service_1.MessagesService]
        }), 
        __metadata('design:paramtypes', [contacts_service_1.ContactsService, messages_service_1.MessagesService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map