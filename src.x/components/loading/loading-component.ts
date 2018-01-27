/**
 * Created by colinjlacy on 4/25/16.
 */
import {Component, Input} from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: 'loading-component.html',

})
export class LoadingComponent {
    @Input() loading: boolean;
    constructor() {}
}