import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizMarkerComponent } from "./component/quiz-marker/quiz-marker.component";
import { ScoreComponent } from "./component/score/score.component";

const routes: Routes = [
  { path: "quiz", component: QuizMarkerComponent },
  { path: "score", component: ScoreComponent },
  { path: "", component: QuizMarkerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
