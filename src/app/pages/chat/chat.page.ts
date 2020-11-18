import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;
  newMsg = '';
  constructor(private router:Router, private chatService:ChatService) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }
  sendMessage(){
    this.chatService.addChatMessage(this.newMsg).then(() =>{
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
  signOut(){
    this.chatService.signOut().then(() =>{
      this.router.navigateByUrl('/', {replaceUrl: true});
    })
  }
}
