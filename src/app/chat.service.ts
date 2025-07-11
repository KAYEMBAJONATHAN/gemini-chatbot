import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatPayload {
  message: string;
  persona?: string | null;
}

export interface UpdateChatPayload {
  user_message?: string;
  bot_reply?: string;
  persona?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  sendChat(payload: ChatPayload): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/chat`, payload);
  }


  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/history`);
  }

  getChatById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/history/${id}`);
  }

  deleteAllChats(): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/history`);
  }

  deleteChatById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/history/${id}`);
  }

  updateChatById(id: number, payload: UpdateChatPayload): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/history/${id}`, payload);
  }

  sendVoiceChat(persona?: string): Observable<any> {
    const url = persona
      ? `${this.API_URL}/voice-chat?persona=${encodeURIComponent(persona)}`
      : `${this.API_URL}/voice-chat`;
    return this.http.post<any>(url, {});
  }
}
