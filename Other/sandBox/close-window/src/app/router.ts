import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: 'new-page/:data', component: NewPageComponent },
  // ... other routes
];

@module({
  imports: [RouterModule.forRoot(routes)],
  // ... other module declarations
})
export class AppModule {}