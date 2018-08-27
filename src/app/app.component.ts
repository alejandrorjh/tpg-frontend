import { Component } from '@angular/core';
import * as randomWords from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomWord;
  typedWord : string;
  hideWord = true;
  count = 0;

  startGame() {
    if (this.hideWord) {
        this.randomWord = randomWords(1)[0];
        this.count = 0;
        this.typedWord = "";
    }
    this.hideWord = !this.hideWord;
  }

  checkWord() {
    if (this.randomWord == this.typedWord) {
      this.randomWord = randomWords(1)[0];
      this.count = this.count + 1;
      this.typedWord = "";
    }
  }
}
