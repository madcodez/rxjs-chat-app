import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/models/message';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/shared/models/user';
import { Thread } from 'src/app/shared/models/thread';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  
  messages : Observable<Message[]>
  currentUser : User;
  currentThread : Thread;
  draftMessage : Message;
  constructor(public threadService : ThreadService, public userService : UserService, public messageService : MessageService, public el : ElementRef) { }

  ngOnInit() {


    this.messages = this.threadService.currentThreadMessages;
    
    this.draftMessage = new Message();

    this.messages.subscribe((messages)=>{
      this.scrollToBottom();
    })

    this.userService.currentUser.subscribe(user => this.currentUser = user);

    this.threadService.currentThread.subscribe(thread => this.currentThread = thread)
    

  }
   onEnter(event){
     let m = this.draftMessage;
     m.author= this.currentUser;
     m.thread= this.currentThread;
     m.isRead= true;
     this.messageService.addMessage(m);
     this.draftMessage = new Message();
     event.preventDefault();
   }

   scrollToBottom(){
     const scrollPane = this.el.nativeElement.querySelector('.msg-container-base');
     scrollPane.scrollTop = scrollPane.scrollHeight;

   }
  

}
