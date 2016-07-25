/**
 * Created by argho on 24.07.2016.
 */

import { Directive, ElementRef } from '@angular/core';

import { MessagesService } from '../messages.service';
import * as Ps from 'perfect-scrollbar';

@Directive({
    selector: '[ps]'
})
export class PsDirective {
    constructor(private elementRef: ElementRef,
                private MessagesService: MessagesService) {
        this.MessagesService.$scroll.subscribe(() => setTimeout(this.scrollDown.bind(this), 500));
    }

    element = this.elementRef.nativeElement;

    ngAfterViewInit() {
        Ps.initialize(this.element);
    }

    scrollDown() {
        this.element.scrollTop = this.element.scrollHeight;
        Ps.update(this.element);
    }

}