import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class CrudUploadArquivosService {


constructor( private http: HttpClient) {
}

postData(acessToken:any,File:any){
//cria objeto formData
let formData =new FormData();
formData.set("file",File)
//envia esse dado para a api
const url = "https://api.qiwise-uat.com.br/medias";

const headers = new HttpHeaders({
'Authorization':`Bearer ${acessToken} `});
return this.http.post(url,formData,{headers})

}
getFiles(acessToken:any){

const url = "https://api.qiwise-uat.com.br/medias";
const headers = new HttpHeaders({
'Authorization':`Bearer ${acessToken} `});
return this.http.get(url,{headers})
}
loginToken(){
const urlToken = "https://api.qiwise-uat.com.br/login";

return this.http.post(urlToken,'')
}
excluir(acessToken:any,_id:any){
const url = `https://api.qiwise-uat.com.br/medias/${_id}`;
const headers = new HttpHeaders({
'Authorization':`Bearer ${acessToken} `});
return this.http.delete(url,{ headers })
}


}
