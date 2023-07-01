
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'

@Component({
selector: 'app-chat',
templateUrl: './chat.component.html',
styleUrls: ['./chat.component.css']
})
export class ChatComponent {

faPaperPlane = faPaperPlane;

result = document.getElementById("result")
inputQuestion = document.getElementById("inputQuestion")

humanInput:string=''
public currentText: any = "Chat: ";

@ViewChild('scrollMe') private myScrollContainer!: ElementRef;

constructor(private http: HttpClient) {

}
ngAfterViewChecked() {
this.scrollToBottom();
}
scrollToBottom(): void {
try {
this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
} catch (err) { }
}
filter(evt:any){
this.callChat(evt.target.value);
}
ngOnInit() {
}

typeWriter(text: string): void {
const outputEl = document.querySelector('#outputEl');
const cursor = document.querySelector('#cursor');

if (outputEl && cursor) {
const textNode = document.createTextNode(text);
outputEl.insertBefore(textNode, cursor);
}
}

async callChat(event:any) {
// propriedade que liga o html ao ts

const humanInput = event.target.value;
const body = {
prompt: this.humanInput
};

const requestOptions: RequestInit = {
method: 'POST',
body: JSON.stringify(body),
headers: {
'Content-Type': 'application/json'
}
};

try {

const response = await fetch('https://api.qiwise-uat.com.br/chat', requestOptions);

if (response && response.body) {
const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
const { done, value } = await reader.read();
if (done) {
break;
}
const decoded = decoder.decode(value, { stream: true });
console.log("decoded: ",response.body);
this.currentText += decoded;

}
}


} catch (err) {
console.error(err);
}
}

}
