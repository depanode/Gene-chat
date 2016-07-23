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
        return contacts.filter(contact => {
            let name = name ? contact.name.toLowerCase().includes(name.toLowerCase()) : true;
            let status = onlyOnline ? contact.online === onlyOnline : true;
            return name && status;
        });
    }
}