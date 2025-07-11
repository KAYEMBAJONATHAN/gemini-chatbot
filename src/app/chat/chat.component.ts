import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  //standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ChatComponent {
  message = '';
  persona = '';
  chatHistory: any[] = [];
  voiceTranscript = '';
  voiceReply = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const payload = {
      message: this.message,
      persona: this.persona || null,
    };

    this.http.post<any>('http://127.0.0.1:8000/api/chat', payload).subscribe({
      next: (res) => {
        this.chatHistory.unshift({
          user_message: this.message,
          bot_reply: res.reply,
        });
        this.message = '';
      },
      error: (err) => alert('Error sending message: ' + err.message),
    });
  }

  getHistory() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/history').subscribe({
      next: (res) => {
        this.chatHistory = res;
      },
      error: (err) => alert('Failed to load history',),
    });
  }
}
