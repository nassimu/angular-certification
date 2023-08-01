import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Answer } from "src/app/model/answer.model";
import { Quiz } from "src/app/model/quiz.model";

@Component({
  selector: "app-answer-form",
  templateUrl: "./answer-form.component.html",
  styleUrls: ["./answer-form.component.scss"],
})
export class AnswerFormComponent {
  @Input() quiz!: Quiz;

  @Input() answer: Answer | null = null;

  @Output() selected: EventEmitter<Answer> = new EventEmitter<Answer>();

  selectedValue: Answer = { quiz: this.quiz, answer: "" };

  selectValue(str: string): void {
    this.selectedValue = { quiz: this.quiz, answer: str };

    this.selected.emit(this.selectedValue);
  }

  getClass(answer: string): string {
    if (this.answer !== null) {
      if (answer === this.quiz.correct_answer) {
        return "btn btn-success";
      } else if (this.answer.answer !== this.quiz.correct_answer && answer === this.answer.answer) {
        return "btn btn-danger";
      } else {
        return "btn btn-outline-success";
      }
    } else {
      return this.selectedValue.answer === "" || this.selectedValue.answer !== answer ? "btn btn-outline-success" : "btn btn-success";
    }
  }
}
