import { uuid } from "src/app/util/uuid";
import { Message } from "src/app/shared/models/message";

export class Thread{
    id : string ;
    lastMessage: Message;
    name : string;
    avatarSrc : string
 constructor(id? : string, name? : string, avatarSrc? : string ){
       this.id = id || uuid();
       this.name = name ;
       this.avatarSrc = avatarSrc;
 }
}