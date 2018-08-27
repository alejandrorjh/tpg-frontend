import { Component, OnInit } from '@angular/core';
import * as randomWords from 'random-words';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  teamName;

  constructor() { }

  ngOnInit() {
    this.teamName = randomWords(1);
    var firstLetter = this.teamName[0].substr(0,1).toUpperCase();
    var lastPart = this.teamName[0].substr(1);
    this.teamName[0] = firstLetter + lastPart;
  }

}
