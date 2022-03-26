import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { DefaultUserAuthService } from '../services/default-user-auth.service';
import { PlaceService } from '../services/place.service';
import $ from 'jquery';

declare let alertify: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private placeServices: PlaceService, private defaultUserAuthService: DefaultUserAuthService, private adminService: AdminService) { }
  category: Category[] = [];
  text = "";
  ngOnInit() {
    //Arama
    $('#searchBarIcon').on('click', function () {
      $('#searchBarIcon2').toggleClass('active');
      $('#searchBar').toggleClass('active').focus();
    });
    
    $('#searchBar').on({
      focusout: function () {
        $('#searchBar').data('timer', setTimeout(function () {
          $('#searchBarIcon2').removeClass('active');
          $('#searchBar').removeClass('active');
        }.bind('#searchBar'), 0));
      },
      focusin: function () {
        clearTimeout($('#searchBar').data('timer'));
      }
    });
    
    $('#searchBarIcon').on({
      focusout: function () {
        $('#searchBar').data('timer', setTimeout(function () {
          $('#searchBar').removeClass('active');
          $('#searchBarIcon2').removeClass('active');
        }.bind('#searchBar'), 0));
      },
      focusin: function () {
        clearTimeout($('#searchBar').data('timer'));  
      }
    })
    //menu
    //TODO
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }

  logOut1() {
    this.defaultUserAuthService.logOut();
    window.location.reload();
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

  get isAuthenticated1() {
    return this.defaultUserAuthService.loggedIn();
  }

  @ViewChild('input') _input!: ElementRef;
  sendInput() {
    this.text = this._input.nativeElement.value;
    this.router.navigateByUrl("/place?text=" + this.text)
  }

  myFunction() {
    
  }

  fiPuan() {
    alertify
      .alert("Alışveriş yaptıkça kazanacağınız Fİ puanlar yakında sizlerle", function () {
      }).set('label', 'Tamam').set({ title: "FiPuan" });
  }

  onEnter() {
    console.log("asd")
    //var x = document.getElementById("placeContainer")
    document.getElementById('placeContainer')?.scrollIntoView()
  }

}
