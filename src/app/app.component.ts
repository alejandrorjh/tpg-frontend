import { Component } from '@angular/core';
import * as randomWords from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomWord = randomWords(1);
}
