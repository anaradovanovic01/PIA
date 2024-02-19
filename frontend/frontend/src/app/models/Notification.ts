import { Class } from "./Class";

export class Notification {
    id: number = 0;
    classId: number = 0;
    student: string = "";
    tutor: string = "";
    type: string = "";
    datetime: Date = new Date();
    seen: boolean = false;
    c: Class = new Class();
}