import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dragMode = true;
  resizeMode = true;

  constructor() { }

  ngOnInit() {
  }

  onDragMode(value) {
    console.log(value);
  }

  onResizeMode(value) {
    console.log(value);
  }

}
