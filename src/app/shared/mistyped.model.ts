export class MistypedChar {
    private userID: number;
    private goalChar: string;
    private typedChar: string;
  
    constructor(userID: number, goalChar: string, typedChar: string) {
      this.userID = userID;
      this.goalChar = goalChar;
      this.typedChar = typedChar;
    }
  }
  