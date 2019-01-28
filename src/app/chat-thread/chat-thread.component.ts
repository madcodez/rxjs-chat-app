import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/shared/models/thread';
import { Input } from '@angular/core';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread : Thread ;
  selected = false;
  constructor(public threadService : ThreadService) { }

  ngOnInit() {

    this.threadService.currentThread.subscribe((currentThread : Thread) => this.selected = this.thread === currentThread);
  }

  clicked(event){
      this.threadService.setCurrentThread(this.thread);
      event.preventDefault();
  }

}
