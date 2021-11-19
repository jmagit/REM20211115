import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import { ShowErrorsMessagesComponent } from './show-errors-messages/show-errors-messages.component';
import { ListButtonsComponent } from './list-buttons.component';

@NgModule({
  declarations: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent,
    ListButtonsComponent,
  ],
  exports: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent,
    ListButtonsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
