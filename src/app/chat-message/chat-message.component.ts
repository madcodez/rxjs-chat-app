import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message';
import { Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message : Message
  incoming = false;
  constructor(public userService : UserService) { }

  ngOnInit() {
    console.log(this.message)
    this.userService.currentUser.subscribe(user => {
       if(this.message.author && user)
           this.incoming = this.message.author !== user;
    })
  }

}
