import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-filter-data',
  templateUrl: './filter-data.component.html',
  styles: [
  ]
})
export class FilterDataComponent {
  @Input() options: string[] = [];

  constructor() {
  }
}
