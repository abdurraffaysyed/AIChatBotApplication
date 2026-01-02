import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IGX_LIST_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective } from 'igniteui-angular';
import { AIChatBotFrontEndComponent } from './aichat-bot-front-end.component';

describe('AIChatBotFrontEndComponent', () => {
  let component: AIChatBotFrontEndComponent;
  let fixture: ComponentFixture<AIChatBotFrontEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIChatBotFrontEndComponent, NoopAnimationsModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IGX_LIST_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AIChatBotFrontEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
