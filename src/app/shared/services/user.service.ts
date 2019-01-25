import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { User } from "../models/user";

@Injectable()

export class UserService {

    currentUser : Subject<User> = new BehaviorSubject<User>(null);
    constructor(){
      
    }
    setCurrentUser(user : User){
       // console.log(user);
        this.currentUser.next(user);
        
      //  console.log(this.currentUser)
    }

}
export const userServiceInjectable : Array<any> = [UserService];