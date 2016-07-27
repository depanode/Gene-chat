/**
 * Created by argho on 23.07.2016.
 */

import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterContactsBy'
})

@Injectable()
export class filterContactsBy implements PipeTransform {
    transform(contacts: any[], name: string, onlyOnline: boolean): any {
        if(!contacts || !contacts.length) return contacts;
        return contacts.filter(contact => {
            let nameContains = name ? contact.name.toLowerCase().includes(name.toLowerCase()) : true;
            let status = onlyOnline ? contact.online === onlyOnline : true;
            return nameContains && status;
        });
    }
}