import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/service/category.service";
import { TriviaCategory } from "src/app/model/category.model";
import { Difficulty } from "src/app/model/difficulty";
import { Quiz, QuizResponse } from "src/app/model/quiz.model";
import { Answer } from "src/app/model/answer.model";

@Component({
  selector: "app-quiz-marker",
  templateUrl: "./quiz-marker.component.html",
  styleUrls: ["./quiz-marker.component.scss"],
})
export class QuizMarkerComponent implements OnInit, OnDestroy {
  listCategories = [] as TriviaCategory[];
  listDifficulty = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];
  listQuiz = [] as Quiz[];

  selectedCategory = null as TriviaCategory | null;
  selectedDifficulty = null as Difficulty | null;

  answers = new Map();

  private readonly subscription: Subscription = new Subscription();

  constructor(private readonly categoryService: CategoryService, private readonly router: Router) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.categoryService.getListTriviaCategory().subscribe({
        next: (response: any) => {
          this.listCategories = response.trivia_categories;
        },
      })
    );
  }

  selectedValue(answer: Answer): void {
    this.answers.set(answer.quiz.question, answer);
  }

  getList(): void {
    this.subscription.add(
      this.categoryService.getListQuiz(5, Number(this.selectedCategory?.id), this.selectedDifficulty).subscribe({
        next: (response: QuizResponse) => {
          console.log(response);
          if (response.response_code === 0) {
            response.results.forEach((element) => {
              element.correct_answer = this.unescapeHtml(element.correct_answer);
              element.question = this.unescapeHtml(element.question);
              let array = [] as string[];
              array.push(element.correct_answer);

              for (let i = 0; i < element.incorrect_answers.length; i++) {
                element.incorrect_answers[i] = this.unescapeHtml(element.incorrect_answers[i]);
              }

              element.incorrect_answers.forEach((inc) => this.unescapeHtml(inc));
              element.incorrect_answers.forEach((incorrect_answer) => array.push(incorrect_answer));
              element.answers = array.sort((a, b) => 0.5 - Math.random());
              return element;
            });
            this.listQuiz = response.results;
          }
        },
      })
    );
  }

  unescapeHtml(str: string): string {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&rsquo;/, "’")
      .replace(/&#039;/g, "'");
  }

  showSubmit(): boolean {
    return this.answers.size === this.listQuiz.length && this.answers.size !== 0;
  }

  submit(): void {
    this.router.navigate(["score"], { state: { answers: this.answers } });
  }
}
