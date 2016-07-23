/**
 * Created by argho on 23.07.2016.
 */

import { Component } from '@angular/core';

import { ContactList } from './contact-list.component';
import { ChatBlock } from './chat.component';

@Component({
    selector: 'my-app',
    templateUrl: `app/app.component.html`,
    directives: [ContactList, ChatBlock]
})

export class AppComponent{

}