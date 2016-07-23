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
var filterContactsBy = (function () {
    function filterContactsBy() {
    }
    filterContactsBy.prototype.transform = function (contacts, name, onlyOnline) {
        if (!contacts)
            return contacts;
        return contacts.filter(function (contact) {
            var nameContains = name ? contact.name.toLowerCase().includes(name.toLowerCase()) : true;
            var status = onlyOnline ? contact.online === onlyOnline : true;
            return nameContains && status;
        });
    };
    filterContactsBy = __decorate([
        core_1.Pipe({
            name: 'filterContactsBy'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], filterContactsBy);
    return filterContactsBy;
}());
exports.filterContactsBy = filterContactsBy;
//# sourceMappingURL=contacts-filter.js.map