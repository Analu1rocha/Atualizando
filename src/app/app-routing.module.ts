import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadArquivosComponent } from './pages/upload-arquivos/upload-arquivos.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'upload-arquivos', component: UploadArquivosComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
