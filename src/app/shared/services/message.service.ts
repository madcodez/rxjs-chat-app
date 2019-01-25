import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Message } from "../models/message";
import { Thread } from "../models/thread";
import { User } from "../models/user";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';



import { Observable } from "rxjs/Observable";
interface IMessageOperation extends Function {
    (messages : Message[]): Message[]
 }
 let initialMessages : Message[] = [];
@Injectable()



export class MessageService {
    
    
   
    newMessages : Subject<Message> = new Subject<Message>();
    update : Subject<any>= new Subject<any>();
    create : Subject<any> = new Subject<any>();
    messages : Observable<Message[]>
    markThreadAsRead : Subject<any> = new Subject<any>();
    constructor(){
      this.messages = this.update.scan((messages : Message[],operation : IMessageOperation) :Message[]=>
                                                                                                    {
                                                                                                    return operation(messages) 
                                                                                                    }
                                                                                                    ,initialMessages )
                                .publishReplay(1)
                                .refCount();

      this.create.map(function(message : Message) : IMessageOperation 
                                                    {
                                                        return (messages :Message[]) =>
                                                        {
                                                            return messages.concat(message)
                                                        } 
                                                     })
                 .subscribe(this.update);
      this.newMessages.subscribe(this.create);
      this.messages.subscribe();

      this.markThreadAsRead.map((thread : Thread )=> {
            return (message : Message[])=>{
                return message.map((message : Message) =>{
                    if(message.thread.id = thread.id){
                        message.isRead = true;
                    }
                    return message;
                })
            }
      })
      //console.log(this.create);
    }


    messagesForThreadUser(thread  : Thread , user : User){
       return this.newMessages.filter((message : Message)=>  {
           return  (message.thread.id === thread.id) && (message.author.id !== user.id)
       })
    }


    addMessage(message){

       this.newMessages.next(message);
      
    }

}

export const messageServiceInjectable : Array<any> = [MessageService];