import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { Thread } from "../models/thread";
import { Observable, Subject,BehaviorSubject,combineLatest } from "rxjs";
import { Message } from "../models/message";
import * as _ from 'lodash';

@Injectable()

export class ThreadService{

    threads : Observable<{[key : string]: Thread}>;
    currentThread : Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
    orderedThread : Observable<Thread> ;
    currentThreadMessages : Observable<Message[]> ;
     

    constructor(public messageService : MessageService ){
       
        this.threads = messageService.messages.map((messages : Message[])=>{
            const threads : {[key : string] : Thread} ={};

               messages.map((message : Message)=>{
                   threads[message.thread.id] = message.thread || threads[message.thread.id] ;


                   const messagesThread  : Thread = threads[message.thread.id];
                   if( !messagesThread.lastMessage || message.sentAt < messagesThread.lastMessage.sentAt){
                    messagesThread.lastMessage = message;
                   }
               });

               
               return threads
        });


       this.orderedThread = this.threads.map( (threadsIdx : {[key: string] : Thread}) =>{
           const threads =_.values(threadsIdx);
           return _.sortBy(threads,(t : Thread)=> t.lastMessage.sentAt).reverse();
       });
      
    //  console.log(this.currentThread)
   
      this.currentThreadMessages= combineLatest(this.currentThread,messageService.messages,(currentThread: Thread , messages : Message[])=>{
       
        if(currentThread && messages.length > 0){
            
            return _.chain(messages)
                    .filter((message : Message) => message.thread.id === currentThread.id)
                    .map((message : Message)=>{
                        message.isRead= true;;                               
                        return message
                }).value()
        }else{
            return [];
        }

      });
   // this.currentMessagesforThread.subscribe(data => console.log(data))

       //this.orderedThread.subscribe(threads => _.map(threads , (thread)=> console.log(thread.lastMessage.text)));

        // this.threads.subscribe((threadsIdx : {[key : string] : Thread} ) => {
        //     const threads = _.values(threadsIdx);
        //     const thName = _.map(threads,((t : Thread ) => t.name));

        //     console.log(`=> threads (${threads.length} : ${thName})`);
        // });


      //  this.threads.subscribe(console.log);
      this.currentThread.subscribe(this.messageService.markThreadAsRead)
    }

    setCurrentThread(thread : Thread){
       this.currentThread.next(thread);
      // this.currentThread.subscribe(data => console.log(data));
    }

    markTheThreadRead(){
        this.currentThread.map((thread : Thread ) => { return (messages : Message[])=>{
            messages.map((message: Message)=>{  message.isRead = true; return message;})
        }});
    }

  
}
export const threadServiceInjectable : Array<any> = [ThreadService];