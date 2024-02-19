import { EventEmitter, NgZone } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';
import * as i0 from "@angular/core";
export declare class PdfToggleSidebarComponent {
    private ngZone;
    show: ResponsiveVisibility;
    sidebarVisible: boolean | undefined;
    showChange: EventEmitter<boolean>;
    onClick: () => void;
    constructor(ngZone: NgZone);
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfToggleSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdfToggleSidebarComponent, "pdf-toggle-sidebar", never, { "show": { "alias": "show"; "required": false; }; "sidebarVisible": { "alias": "sidebarVisible"; "required": false; }; }, { "showChange": "showChange"; }, never, never, false, never>;
}
