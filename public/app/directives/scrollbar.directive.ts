/**
 * Created by argho on 24.07.2016.
 */

import { Directive, ElementRef } from '@angular/core';

import * as Ps from 'perfect-scrollbar';

@Directive({
    selector: '[ps]'
})
export class PsDirective {
    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        Ps.initialize(this.elementRef.nativeElement);
    }
}