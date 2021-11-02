import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/component/login/auth.service';
import { UIStateService } from 'src/app/shared/spinner/load-widget.service';
declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(public router: Router, public authSrv: AuthService, public uiState: UIStateService) {}

  public innerWidth: number=0;
  public defaultSidebar='';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:string) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }
}
