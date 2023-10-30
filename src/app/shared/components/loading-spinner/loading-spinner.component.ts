import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: [
  ]
})
export class LoadingSpinnerComponent {
  @Input() whatIsLoading: string = '';
  
}
