import { Injectable } from "@angular/core";
import { TriviaCategory } from "../model/category.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Difficulty } from "../model/difficulty";
import { QuizResponse } from "../model/quiz.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  getListTriviaCategory(): Observable<TriviaCategory[]> {
    return this.httpClient.get<TriviaCategory[]>("https://opentdb.com/api_category.php");
  }

  getListQuiz(amount: number, categoryId: number, difficulty: Difficulty | null) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("amount", amount);
    queryParams = queryParams.append("category", String(categoryId));
    queryParams = queryParams.append("difficulty", String(difficulty).toLowerCase());
    queryParams = queryParams.append("type", "multiple");
    return this.httpClient.get<QuizResponse>("https://opentdb.com/api.php", {
      params: queryParams,
    });
  }
}
