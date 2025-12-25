export class Customer {
  id: string;
  private points: number;

  constructor(id: string, points = 0) {
    this.id = id;
    this.points = points;
  }

  addPoints(value: number) {
    this.points += value;
  }

  takePoints(value: number): boolean {
    if (value > this.points) {
      return false;
    }

    this.points -= value;
    return true;
  }

  getPoints() {
    return this.points;
  }
}
