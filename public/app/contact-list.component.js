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
var contacts_filter_1 = require('./pipes/contacts-filter');
var ContactList = (function () {
    function ContactList() {
        this.onlyOnline = false;
        this.nameContains = ''; //TODO filter by name
        this.contactSelected = new core_1.EventEmitter();
    }
    ContactList.prototype.showOnline = function (online) {
        this.onlyOnline = online;
    };
    ContactList.prototype.selectContact = function (contact) {
        this.selectedContact = contact;
        this.contactSelected.emit(contact);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContactList.prototype, "contacts", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContactList.prototype, "contactSelected", void 0);
    ContactList = __decorate([
        core_1.Component({
            selector: 'contact-list',
            templateUrl: "app/contact-list.component.html",
            pipes: [contacts_filter_1.filterContactsBy]
        }), 
        __metadata('design:paramtypes', [])
    ], ContactList);
    return ContactList;
}());
exports.ContactList = ContactList;
//# sourceMappingURL=contact-list.component.js.map