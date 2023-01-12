import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  @Input('name') name = '';
  @Input('value') value = '';

  constructor() {
  }

  ngOnInit() {
    console.log(this.name + " = " + this.value);
  }

}
