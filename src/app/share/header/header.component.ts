import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PushnotificationService } from 'src/app/services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public static logout: Subject<any> = new Subject();
  public islogedin = false;
  public loginUser: any = '';
  public userActivities: any = [];
  public enquiriesForebase: any = [];
  public transactionsForebase: any = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: PushnotificationService
  ) {
    this.notificationService.requestPermission();  
    // this.db.list('users').push({
    //   mobile: 9807656563,
    //   email: 'crao.wonderpillrs@gmail.com',
    // });
  }

  ngOnInit() {
  }
  notify() {  
    let data: Array < any >= [];  
    data.push({  
        'title': 'Approval',  
        'alertContent': 'This is First Alert -- By Debasis Saha'  
    });  
    data.push({  
        'title': 'Request',  
        'alertContent': 'This is Second Alert -- By Debasis Saha'  
    });  
    data.push({  
        'title': 'Leave Application',  
        'alertContent': 'This is Third Alert -- By Debasis Saha'  
    });  
    data.push({  
        'title': 'Approval',  
        'alertContent': 'This is Fourth Alert -- By Debasis Saha'  
    });  
    data.push({  
        'title': 'To Do Task',  
        'alertContent': 'This is Fifth Alert -- By Debasis Saha'  
    });  
    this.notificationService.generateNotification(data);  
}  
  mainPageClass() {
    this.renderer.removeClass(this.document.body, 'login-page');
    this.renderer.addClass(this.document.body, 'sidebar-mini');
    this.renderer.addClass(this.document.body, 'skin-red-light');
    this.renderer.addClass(this.document.body, 'fixed');
  }
}
