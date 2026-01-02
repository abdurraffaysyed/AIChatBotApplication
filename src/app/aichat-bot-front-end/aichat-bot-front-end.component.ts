import { Component } from '@angular/core';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent } from 'igniteui-angular';

@Component({
  selector: 'app-aichat-bot-front-end',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IgxButtonDirective],
  templateUrl: './aichat-bot-front-end.component.html',
  styleUrls: ['./aichat-bot-front-end.component.scss']
})
export class AIChatBotFrontEndComponent {
  public chatHistorySelectedItem?: string;
}
