import { uuid } from "src/app/util/uuid";

export class User{
    id : string;

    constructor(public name : string , public avatarSrc : string){
     this.id = uuid();
    }
}