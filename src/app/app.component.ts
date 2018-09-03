import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import * as randomWords from 'random-words';
import { Score } from './shared/score.model';
import { MistypedChar } from './shared/mistyped.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  scoring = {
    gameScore: [],
    mistypes: []
  };

  stats = [];

  typedWord: string;
  displayedWord: string;
  typingButtonLabel = "Start typing!"
  randomWord = randomWords(1)[0];

  timer;
  timeLeft: number;
  globalAccuracy: number;
  golablWordsTyped: number;
  currWordLength: number;
  correctChars = 0;
  correctWords = 0;
  accuracy = 100;
  baseTime = 10;
  failures = 0;
  userID = 0;

  gameStarted = false;
  timeout = false;

  @ViewChild("wordInput") wordInput: ElementRef;
  @ViewChild("restartButton") restartButton: ElementRef;

  ngOnInit() {
    this.timeLeft = this.baseTime;
    this.displayedWord = this.randomWord;
    this.currWordLength = this.randomWord.length;
  }

  ngAfterViewInit() {
    this.focusWordInput();
  }

  finishGame() {
    this.timeout = true;
    this.gameStarted = false;
    this.wordInput.nativeElement.disabled = true;
    this.saveGameResults();
    this.updateStats();
    this.typingButtonLabel = "Restart?"
  }

  restartGame() {
    this.updateWord();
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

  checkWord(event) {
    if(event.inputType === "deleteContentBackward") { 
      return;
    };

    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startCountdown();
    }

    if (this.randomWord == this.typedWord) {
      this.correctWords = this.correctWords + 1;
      this.scoring.gameScore.push(new Score(this.userID, this.typedWord, this.failures, this.accuracy));
      this.updateWord();
    } else if (!this.accurateTyping()) {
      this.updateAccuracy();
    }
  }

  updateWord() {
    this.randomWord = randomWords(1)[0];
    this.displayedWord = this.randomWord;
    this.currWordLength = this.randomWord.length;
    this.typedWord = "";
    this.correctChars = 0;
    this.failures = 0;
    this.accuracy = 100;
  }

  saveGameResults() {
    var jsonObj = JSON.stringify(this.scoring);
    this.stats.push(jsonObj);
    console.log(this.stats);
  }

  accurateTyping() {
    let currTypedIndex = this.typedWord.length;

    let goal = this.randomWord.substring(currTypedIndex - 1, currTypedIndex);
    let typed = this.typedWord.substring(this.typedWord.length - 1)

    if (this.randomWord.substring(0, currTypedIndex) == this.typedWord) {
      this.correctChars = this.correctChars + 1;
      this.highlightCorrect();
      return true;
    }
    
    this.highlightMistake();
    this.scoring.mistypes.push(new MistypedChar(0, goal, typed));
    return false;
  }

  updateAccuracy() {
    this.failures = (this.failures < this.currWordLength) ? this.failures + 1 : this.currWordLength;
    this.accuracy = 100 - Math.round((this.failures * 100) / this.currWordLength);
  }

  updateStats() {
    let acc = 0;
    this.scoring.gameScore.forEach(function(value) {
      acc = acc + value["accuracy"]
    });

    this.golablWordsTyped = this.scoring.gameScore.length;
    this.globalAccuracy = Math.round(acc / this.golablWordsTyped);
  }

  highlightCorrect() {
    let firstPart = this.randomWord.substring(0, this.typedWord.length);
    let lastPart = this.randomWord.substring(this.typedWord.length);

    this.displayedWord = '<span class=correctHighlight>' + firstPart + '</span>' + lastPart;     
  }

  highlightMistake() {
    debugger;
    let mistakes = this.typedWord.length - this.correctChars;

    let firstPart = this.randomWord.substring(0, this.correctChars);
    let error = this.randomWord.substring(firstPart.length, firstPart.length + mistakes);
    let lastPart = this.randomWord.substring(firstPart.length + error.length);

    let correctSpan = '<span class=correctHighlight>' + firstPart + '</span>';
    let errorSpan = '<span class=mistakeHighlight>' + error + '</span>';

    this.displayedWord = correctSpan + errorSpan + lastPart;     
  }
}
