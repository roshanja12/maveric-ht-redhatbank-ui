import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-template',
  templateUrl: './account-template.component.html',
  styleUrls: ['./account-template.component.css'],
})
export class AccountTemplateComponent {
  @Input() searchText!: string;
  @Input() accountName!: string;
  @Input() buttonName!: string;
  @Input() searchPlaceHolder!: string;
  @Output() onSearchClick = new EventEmitter<string>();
  @Output() onCreateClick = new EventEmitter<Event>();
  constructor() {}
  searchEvent() {
    console.log('sent event emit for search text ' + this.searchText);
    if (this.searchText != undefined || this.searchText != null) {
      this.onSearchClick.emit(this.searchText);
    }
    console.log('Search Bar empty');
  }
  createEvent() {
    console.log('send event for create button');
    this.onCreateClick.emit('something' as unknown as Event);
  }
}
