import { User } from "../models/user";
import { Thread } from "../models/thread";
import { Message } from "../models/message";
import { MessageService } from "./message.service";
import { ThreadService } from "./thread.service";
import * as _ from 'lodash';

describe('Threasd Service',()=>{
    it('tread test',()=>{
        const nate = new User('nate','');
        const nani = new User('nani','');

        const t1 = new Thread('t1','Thread1','');
        const t2 = new Thread('t2','Thread2','');

        const m1 = new Message({
            author : nate,
            text:'Heloo',
            thread : t1
        });
     
            const m2 = new Message({
                author : nani,
                text:'Hely hey',
                thread : t1
            });
           

        
            const m3 = new Message({
                author : nate,
                text:'Angular 2',
                thread : t2
            });
    
      
      
            const m4 = new Message({
                author : nate,
                text:'Redux',
                thread : t2
            });
            
          
           setTimeout(()=>{
             const m5 = new Message({
                author : nate,
                text:'RsJx',
                thread : t2
            });
            mgService.addMessage(m5);
           // thService.orderedThread.subscribe(threads => _.map(threads , (thread)=> console.log(thread.lastMessage.text)));
           thService.orderedThread.subscribe(console.log)
           },6000) 
    

        const mgService = new MessageService();
      

 

        const thService = new ThreadService(mgService);
         thService.threads.subscribe((threadsIdx : {[key : string] : Thread} ) => {
            const threads = _.values(threadsIdx);
            const thName = _.map(threads,((t : Thread ) => t.name));

          console.log(`=> threads (${threads.length} : ${thName})`);
        });
       
     //  thService.orderedThread.subscribe(threads => _.map(threads , (thread)=> console.log(thread.lastMessage.text)));
     
      mgService.addMessage(m1);
      mgService.addMessage(m2);
      mgService.addMessage(m3);
      mgService.addMessage(m4);
    
      thService.setCurrentThread(t2);
      thService.orderedThread.subscribe(console.log)
     // thService.currentMessagesforThread.subscribe(data =>console.log(data));

    });
})