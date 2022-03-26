import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { PlaceService } from 'src/app/services/place.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private placeServices: PlaceService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private router: Router,
    private placeService: PlaceService,
  ) { }
  category: Category[] = [];
  isOpened: boolean = false;
  filterText!: string;
  mekanId!: number;
  categoryId!: number;
  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.placeServices.getCategories().subscribe((data) => {
      this.category = data;
    });
  }

  active!: number;
  onClick(index: number) {
    this.active = index + 1;
    //console.log(index + '-' + this.active);
    if (index === -1) {
    } else {
      this.router.navigateByUrl('/place-category/' + (index));
    }
  }

}
