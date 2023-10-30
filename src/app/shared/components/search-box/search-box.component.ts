import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  ngOnInit(): void {
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }
}
