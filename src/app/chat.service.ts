import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/chat/ask';

  sendMessage(userMsg: string): Observable<any> {
    // This matches the Map<String, String> expected by your Spring Boot backend
    const payload = { message: userMsg };
    return this.http.post<any>(this.apiUrl, payload);
  }
}