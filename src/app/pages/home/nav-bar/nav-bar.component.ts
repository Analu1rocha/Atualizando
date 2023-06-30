import { Component } from '@angular/core';
import { faUpload, faArrowLeft, faUser, faEllipsis} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  preserveWhitespaces: true
})
export class NavBarComponent {

  faUpload = faUpload;
  faArrowLeft = faArrowLeft;
  faUser = faUser;
  faEllipsis = faEllipsis;
}
