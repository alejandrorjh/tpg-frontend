export class WordScore {
    private userID: number;
    private typedWord: string;
    private failures: number;
    private accuracy: number;
  
    constructor(userID: number, typedWord: string, failures: number, accuracy: number) {
      this.userID = userID;
      this.typedWord = typedWord;
      this.failures = failures;
      this.accuracy = accuracy;
    }
  }
  