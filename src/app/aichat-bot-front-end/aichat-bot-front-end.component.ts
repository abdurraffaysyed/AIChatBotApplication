import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent } from 'igniteui-angular';
import { ChatService } from '../chat.service';

@Component({
  standalone: true,
  selector: 'app-aichat-bot-front-end',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IgxButtonDirective, FormsModule],
  templateUrl: './aichat-bot-front-end.component.html',
  styleUrls: ['./aichat-bot-front-end.component.scss']
})
export class AIChatBotFrontEndComponent {
  public chatHistorySelectedItem?: string;
  public message= '';

  constructor(private chatService: ChatService) {}

  onSubmit(): void {
    const text = this.message?.trim();
    if (!text) {
      return;
    }

    this.chatService.sendMessage(text).subscribe({
      next: (response) => {
        // TODO: handle response and update UI (chat history etc.)
        console.log('Chat response:', response);
      },
      error: (err) => console.error('Send message failed', err)
    });

    // clear input after sending
    this.message = '';
  }
}
