import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from "./chat/chat.component";


@Component({
  selector: 'app-root',
 // standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  message = '';
  reply = '';

  constructor(private http: HttpClient) {}

  send() {
    this.http.post<any>('http://127.0.0.1:8000/api/chat', {
      message: this.message,
      persona: null,
    }).subscribe(res => {
      this.reply = res.reply;
    });
  }
}
