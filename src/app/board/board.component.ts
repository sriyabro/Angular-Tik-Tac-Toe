import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  filled: string[] = [];
  xIsNext: boolean = true;
  winner: string | null = null;
  draw: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.newGame(); //reset game on start    
  }

  //reset game - on start & on Play Again click
  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.draw = false;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.winner) {
      if (!this.squares[idx]) {
        this.filled.push(this.player);
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }
      this.winner = this.calculateWinner();
      if (!this.squares.includes(null) && !this.winner) {
        this.draw = true;
        return;
      }
    }

  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && (this.squares[a] === this.squares[b]) && (this.squares[a] === this.squares[c])) {
        return this.squares[a];
      }
    }
    return null;
  }

}
