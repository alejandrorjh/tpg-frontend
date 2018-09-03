export class Score {
  private userID: number;
  private word: string;
  private errors: number;
  private accuracy: number;

  constructor(userID: number, word: string, errors: number, accuracy: number) {
    this.userID = userID;
    this.word = word;
    this.errors = errors;
    this.accuracy = accuracy;
  }
}
