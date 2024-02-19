import { EventEmitter, NgZone } from '@angular/core';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import * as i0 from "@angular/core";
export declare class PdfSinglePageModeComponent {
    private notificationService;
    private ngZone;
    show: ResponsiveVisibility;
    scrollMode: ScrollModeType;
    pageViewMode: PageViewModeType;
    pageViewModeChange: EventEmitter<PageViewModeType>;
    onClick: () => void;
    constructor(notificationService: PDFNotificationService, ngZone: NgZone);
    onPdfJsInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfSinglePageModeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdfSinglePageModeComponent, "pdf-single-page-mode", never, { "show": { "alias": "show"; "required": false; }; "scrollMode": { "alias": "scrollMode"; "required": false; }; "pageViewMode": { "alias": "pageViewMode"; "required": false; }; }, { "pageViewModeChange": "pageViewModeChange"; }, never, never, false, never>;
}
