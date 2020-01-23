import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  public totalUsers = true;
  public isLoading = true;
  public users: any = [];
  public needs: any = '';
  public user: any = '';
  public memories: any = '';
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit() {
  }

  
}
