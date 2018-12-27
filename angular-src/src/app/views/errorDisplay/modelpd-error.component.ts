import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class ModelpdErrorComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}