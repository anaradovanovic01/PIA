import { RegRequest } from "./RegRequest";
import { Subject } from "./Subject";

export class User {
    username: string = "";
    password: string = "";
    question: string = "";
    answer: string = "";
    type: string = "";
    firstname: string = "";
    lastname: string = "";
    gender: string = "";
    address: string = "";
    contact: string = "";
    email: string = "";
    image: string = "";
    typeOfSchool: string = "";
    currentGrade: number = 0;
    rating: number = 0;
    request: RegRequest = new RegRequest();
    deleted: boolean = false;
    subjects: Subject[] = [];
}