import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
} from 'rxjs';
import { SelectPersonArgs } from '../../interfaces/credentials.interfaces';

// type DataSource = () => Observable<any>;

@Component({
  selector: 'select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.css'],
})
export class SelectPersonComponent implements OnInit, OnDestroy {
  @Input() searchPlaceholder: string = 'Buscar...';
  @Input() frontendSearch: boolean = true; // If search is handled by frontend or backend
  @Input() fieldsToSearch: string[] = [];
  @Input() label: string = '';
  @Input() withInitialData: boolean = true;
  @Input() dataSource$: any = () => of([]);
  @Input() afterSelectLoading: boolean = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  items: any[] = [];
  selectedItem: any;
  searchCtrl: FormControl<string> = new FormControl('', { nonNullable: true });
  itemsToSearch: string = '';
  isLoading: boolean = false;
  subs!: Subscription;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.withInitialData) {
      this.loadData();
    }
    this.listenToSearch();
  }

  loadData() {
    this.subs && this.subs.unsubscribe();
    this.isLoading = true;
    const args:SelectPersonArgs = {};
    if(!this.frontendSearch){
      args.search = this.itemsToSearch;
    }
    this.subs = this.dataSource$(args).subscribe((items: any[]) => {
      this.items = items;
      this.isLoading = false;      
    });
  }

  listenToSearch() {
    this.searchCtrl.valueChanges
      .pipe(
        (this.frontendSearch) ? debounceTime(0) : debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe({
        next: (value: string) => {
          this.itemsToSearch = value;
          if(!this.frontendSearch){
            this.loadData();
          }
        },
      });
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  confirmSelection() {
    if (!this.selectedItem) {
      this.toastr.error('Debe seleccionar una persona');
      return;
    }
    this.onSelect.emit(this.selectedItem);
  }

  cancel() {
    this.onCancel.emit();
  }

  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }
}
