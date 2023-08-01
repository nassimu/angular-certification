import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Answer } from "src/app/model/answer.model";
import { Quiz } from "src/app/model/quiz.model";

@Component({
  selector: "app-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.scss"],
})
export class ScoreComponent {
  answers = new Map();
  listQuiz = [] as Quiz[];
  listAnswers = [] as Answer[];

  score: number = 0;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.answers = history.state.answers;
    for (let [key, value] of this.answers) {
      this.listQuiz.push(value.quiz);
      this.listAnswers.push(value);
      if (value.answer === value.quiz.correct_answer) {
        this.score++;
      }
      console.log(`Map key is:${key} and value is:${value.answer}`);
    }
    console.log(this.listQuiz);
  }

  newQuiz(): void {
    this.router.navigateByUrl("quiz");
  }

  getClassAlert(): string {
    if (this.score === 0 || this.score === 1) {
      return "mt-3 alert alert-danger d-flex justify-content-center";
    }
    if (this.score === 2 || this.score === 3) {
      return "mt-3 alert alert-warning d-flex justify-content-center";
    }

    return "mt-3 alert alert-success d-flex justify-content-center";
  }
}
