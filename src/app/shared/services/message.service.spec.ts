import { User } from "../models/user";
import { Thread } from "../models/thread";
import { Message } from "../models/message";
import { MessageService } from "./message.service";



describe('Message Service',()=>{
    it('should test',()=>{
        const user = new User('Manoj','');
        const thread = new Thread('t1','Manoj','');
        const m1 : Message = new Message({
            author : user,
            text : 'Hi',
            thread : thread
        });
       
        const m2 : Message = new Message({
            author : user,
            text : 'Bye',
            thread : thread
        });

        const messageService = new MessageService();
        
        messageService.newMessages.subscribe((message : Message)=>{
             console.log('=> message : '+ message.text);
            
        })
        messageService.messages.subscribe((messages : Message[])=>{
            console.log('=> message count : '+ messages.length);
       });

     messageService.addMessage(m1);
      
      messageService.addMessage(m2);
   
    })
})

