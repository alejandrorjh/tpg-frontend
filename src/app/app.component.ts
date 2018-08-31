import { Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import * as randomWords from 'random-words';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  timer;
  timeLeft;

  typedWord : string;
  typingButtonLabel = "Start typing!"
  randomWord = randomWords(1)[0];

  currWordLength: number;
  correctWords = 0;
  accuracy = 100;
  baseTime = 10;
  failures = 0;

  gameStarted = false;
  timeout = false;

  @ViewChild("wordInput") wordInput: ElementRef;

  ngOnInit() {
    this.timeLeft = this.baseTime;
  }

  ngAfterViewInit() {
    this.focusWordInput();
  }

  finishGame() {
    this.timeout = true;
    this.gameStarted = false;
    this.wordInput.nativeElement.disabled = true;
    this.typingButtonLabel = "Restart?"
  }

  restartGame() {
    this.setupGame();
    this.correctWords = 0;
    this.timeLeft = this.baseTime;
    this.timeout = false;
    this.typingButtonLabel = "Start typing!"
    this.wordInput.nativeElement.disabled = false;
    this.focusWordInput();
  }

  focusWordInput(): void {
    this.wordInput.nativeElement.focus();
  }

  startCountdown() {
    this.timer = setInterval( () => {
           this.checkCountdown();
    }, 1000);
  }

  checkCountdown() {
    this.timeLeft = this.timeLeft - 1;
    if (this.timeLeft === 0) {
      clearInterval(this.timer);
      this.finishGame();
    }
  }

  checkWord() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startCountdown();
    }

    if (this.randomWord == this.typedWord) {
      this.correctWords = this.correctWords + 1;
      this.setupGame();
    } else if (!this.accurateTyping()) {
      this.updateAccuracy();
    }
  }

  setupGame() {
    this.randomWord = randomWords(1)[0];
    this.currWordLength = this.randomWord.length;
    this.typedWord = "";
    this.failures = 0;
    this.accuracy = 100;
  }

  accurateTyping() {
    let currTypedIndex = this.typedWord.length;
    if (this.randomWord.substring(0, currTypedIndex) == this.typedWord) {
      return true;
    }
    return false;
  }

  updateAccuracy() {
    this.failures = (this.failures < this.currWordLength) ? this.failures + 1 : this.currWordLength;
    this.accuracy = 100 - Math.round((this.failures * 100) / this.currWordLength);
  }
}
