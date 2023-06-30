
import { Component, OnInit,OnDestroy } from '@angular/core';
import { CrudUploadArquivosService } from './service/crud-upload-arquivos.service';
import { Subject, takeUntil } from 'rxjs';
import { faUser, faFolderPlus, faTrash, faMessage , faComment} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-arquivos',
  templateUrl: './upload-arquivos.component.html',
  styleUrls: ['./upload-arquivos.component.css']
})

export class UploadArquivosComponent implements OnInit, OnDestroy {

faUser = faUser;
faFolderPlus = faFolderPlus;
faTrash = faTrash;
faMessage = faMessage;
faComment = faComment;

//no file vou armazenar o arquivo
file:any;
//vou armazenar o retorno da api
data:any =[]
//token gerado ao dar um post na api /Login
acessToken:any;

//se desinscrever
private unsubscribe= new Subject<void>


constructor(
//importa o recurso que nos permite acessar uma api (get,post etc)

private service:CrudUploadArquivosService
){

}
// o que tiver aqui dentro será chamado ao iniciar a página
ngOnInit(){
//vai gerar o token ao iniciar a página

this.loginToken()
this.getFiles(this.acessToken,this.data)
}
ngOnDestroy(): void {
this.unsubscribe.next();
this.unsubscribe.complete();
}

//seleciona o arquivo
getFile(event:any){
this.file=event.target.files[0]
console.log("Nome Arquivo",this.file)
this.loginToken()

}
//gera o token e armazena esse retorno em uma variável
loginToken(){
this.service.loginToken().pipe(takeUntil(this.unsubscribe)).subscribe((response:any)=>
{

this.acessToken= response;
this.acessToken= this.acessToken.access_token
console.log(this.acessToken)
this.getFiles(this.acessToken,this.data)
}
)
}
///envia os arquivos para o servidor usando uma variável que armazenou o token
postData(acessToken:any,file:any){
this.service.postData(acessToken,file).pipe(takeUntil(this.unsubscribe)).subscribe((response: any) => {
this.getFiles(acessToken,this.data)


})
}
//pegar os arquivos do back e armazenar em uma variável,usando uma variável que armazena
//o token , variável gerado no loginToken()

getFiles(acessToken:any,data:any){
this.service.getFiles(acessToken).pipe(takeUntil(this.unsubscribe)).subscribe(
(response:any)=>{
this.data = response;
console.log(this.data)
}
)
}
excluir(acessToken:any,_id:any) {

this.service.excluir(acessToken,_id).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
this.getFiles(acessToken,this.data)
})

}
}
