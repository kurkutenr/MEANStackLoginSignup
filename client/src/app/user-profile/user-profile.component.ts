import { Component, OnInit, HostListener } from '@angular/core';

import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {
  userDetails;
  localUrl = "PotatoPi.html"

  yt = '<iframe class="chapter" id="frame" src="'+this.localUrl+'" frameborder="0" ></iframe>';
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        window['historyState'] = "";
        try {
          let curH = JSON.parse(this.userDetails.history)
          if(curH.length > 0 && curH instanceof Array) {
            window['historyState'] = this.userDetails.history
          }
        } catch (error) {
          
        }
        

      },
      err => { 
        console.log(err);
      }
    );
  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  @HostListener('window:onNextPassage', ['$event.detail'])
  onNextPassage(detail) {
      this.updateHistory(detail);
  }

  updateHistory(detail) {

    this.userService.updateHistory(detail).subscribe(
      res => {
        console.log("done saved")
      },
      err => { 
        console.log(err);
      }
    );
  }
}
