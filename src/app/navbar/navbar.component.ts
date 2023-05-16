import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private destroySubject = new Subject();

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe(result => {
        this.isLoggedIn = result;
      });

    this.authService.adminStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe(result => {
        this.isAdmin = result;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.doAuthorizationCheck();
  }

  doAuthorizationCheck() {
    const isAdminCached = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    if (isAdminCached) {
      this.isAdmin = isAdminCached;
    } else {
      this.authService.isAdmin().subscribe({
        next: result => {
          this.authService.setAdminStatus(result);
          if (!result && this.router.url.includes('edit-quotes')) {
            this.router.navigate(['/']);
          }
        },
        error: error => {
          console.log(error);
          if (error.status == 401) {
            this.authService.setAdminStatus(false);
          }
        }
      });
    }
  }
  

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}
