export class Score {
  private userID: number;
  private gameScore: number;
  private wordCount: number;
  private accuracy: number;
  private gameType: number;
  private scoreDate: string;

  constructor(userID: number, gameScore: number, wordCount: number, accuracy: number, gameType: number, scoreDate: string) {
    this.userID = userID;
    this.gameScore = gameScore;
    this.wordCount = wordCount;
    this.accuracy = accuracy;
    this.gameType = gameType;
    this.scoreDate = scoreDate;
  }
}
