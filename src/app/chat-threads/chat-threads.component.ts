import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads : Observable<any>;
  constructor(public threadService : ThreadService) {
     this.threads = this.threadService.orderedThread;
   }

  ngOnInit() {
  }

}
