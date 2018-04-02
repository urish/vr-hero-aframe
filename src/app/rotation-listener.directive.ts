import { Directive, HostListener } from '@angular/core';
import { UserPresenceService } from './user-presence.service';

@Directive({
    selector: '[appRotationListener]',
})
export class RotationListenerDirective {
    constructor(private userPresence: UserPresenceService) {
    }

    @HostListener('componentchanged', ['$event'])
    onPropertyChanged(e: AFrame.EntityEventMap['componentchanged']) {
        if (e.detail.name) {
            const newRotation = (e.currentTarget as AFrame.Entity).getAttribute('rotation');
            this.userPresence.updateMyRotation(newRotation);
        }
    }
}
