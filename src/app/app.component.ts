import { Component } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ChatExampleData } from 'src/app/data/chat-example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public messageService : MessageService, public userService : UserService,public threadService : ThreadService){
       ChatExampleData.init(messageService,threadService,userService);
  }
}
