import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import * as i0 from "@angular/core";
export declare class PdfOpenFileComponent {
    private pdfNotificationService;
    constructor(pdfNotificationService: PDFNotificationService);
    showOpenFileButton: ResponsiveVisibility;
    onClick: (htmlEvent: Event, secondaryToolbar: boolean) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfOpenFileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdfOpenFileComponent, "pdf-open-file", never, { "showOpenFileButton": { "alias": "showOpenFileButton"; "required": false; }; }, {}, never, never, false, never>;
}
