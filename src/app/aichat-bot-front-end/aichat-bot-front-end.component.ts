import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent } from 'igniteui-angular';
import { ChatService } from '../chat.service';

@Component({
  standalone: true,
  selector: 'app-aichat-bot-front-end',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IgxButtonDirective, FormsModule, CommonModule],
  templateUrl: './aichat-bot-front-end.component.html',
  styleUrls: ['./aichat-bot-front-end.component.scss']
})
export class AIChatBotFrontEndComponent {
  public chatHistorySelectedItem?: string;
  public message = '';
  public chatMessages: Array<{ sender: 'user'|'bot', text: string }> = [
    { sender: 'bot', text: 'Hello, how can I help you today?' }
  ];
  public isLoading = false;

  @ViewChild('history') history?: ElementRef<HTMLElement>;

  private scrollToBottom(): void {
    // allow DOM to update first
    setTimeout(() => {
      try {
        const el = this.history?.nativeElement;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      } catch (e) {
        // ignore
      }
    }, 0);
  }

  public isDarkMode = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('ai-chat-theme');
    if (saved === 'dark' || saved === 'light') {
      this.isDarkMode = saved === 'dark';
    } else if (window && (window as any).matchMedia) {
      this.isDarkMode = (window as any).matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('ai-chat-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('ai-chat-theme', 'light');
    }
  }

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  onSubmit(): void {
    const text = this.message?.trim();
    if (!text) {
      return;
    }

    // show user message immediately so clearing the input doesn't remove it
    this.chatMessages.push({ sender: 'user', text });
    this.scrollToBottom();

    // clear input after pushing the user message
    this.message = '';
    // show loader while waiting for response
    this.isLoading = true;

    this.chatService.sendMessage(text).subscribe({
      next: (response) => {
        // try to find first string in response objects (recursive)
        const findFirstString = (v: any, depth = 4): string | null => {
          if (v == null) return null;
          if (typeof v === 'string') return v;
          if (typeof v === 'number' || typeof v === 'boolean') return String(v);
          if (depth <= 0) return null;
          if (Array.isArray(v)) {
            for (const item of v) {
              const found = findFirstString(item, depth - 1);
              if (found) return found;
            }
          } else if (typeof v === 'object') {
            // check common fields first
            const common = ['answer','text','content','message','response','result'];
            for (const k of common) {
              if (typeof v[k] === 'string') return v[k];
            }
            for (const k of Object.keys(v)) {
              const found = findFirstString((v as any)[k], depth - 1);
              if (found) return found;
            }
          }
          return null;
        };
        const extractReply = (resp: any): string => {
          if (!resp) return '';
          if (typeof resp === 'string') return resp;
          // direct fields
          if (typeof resp.answer === 'string') return resp.answer;
          if (resp?.data && typeof resp.data.answer === 'string') return resp.data.answer;
          if (typeof resp.message === 'string') return resp.message;
          if (typeof resp.response === 'string') return resp.response;
          if (Array.isArray(resp.choices) && resp.choices[0]?.message?.content) return resp.choices[0].message.content;
          // recursive find
          const found = findFirstString(resp);
          if (found) return found;
          return JSON.stringify(resp);
        };
        const reply = extractReply(response);
        this.chatMessages.push({ sender: 'bot', text: reply });
        this.isLoading = false;
        this.scrollToBottom();
        console.log('Chat response:', response);
      },
      error: (err) => {
        console.error('Send message failed', err);
        this.isLoading = false;
        this.chatMessages.push({ sender: 'bot', text: 'Sorry, something went wrong.' });
      }
    });
  }
} 
