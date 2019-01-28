import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { combineLatest } from 'rxjs';
import { Message } from '../shared/models/message';
import { Thread } from '../shared/models/thread';
import * as _ from 'lodash';

@Component({
  selector: 'chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {
  unreadMessageCount: number;
  constructor(public messageService : MessageService, public threadService : ThreadService) { }

  ngOnInit() {

    combineLatest(this.messageService.messages,this.threadService.currentThread,
      (messages : Message[],currentThread : Thread) =>
         [messages,currentThread]
    ).subscribe(([messages,currentThread]:[Message[],Thread])=>{
        this.unreadMessageCount = _.reduce(messages,(sum : number,m : Message)=>{
            const messageIsInCurrentThread = m.thread.id === currentThread.id

            if(m && !m.isRead && !messageIsInCurrentThread){
              sum = sum +1;
            }
            return sum
        },0)
    })
  }

}
