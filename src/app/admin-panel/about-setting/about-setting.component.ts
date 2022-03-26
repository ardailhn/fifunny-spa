import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { About } from 'src/app/models/about';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-about-setting',
  templateUrl: './about-setting.component.html',
  styleUrls: ['./about-setting.component.css']
})
export class AboutSettingComponent implements OnInit {

  editor!: Editor;
  html = '';

  constructor(private formBuilder: FormBuilder,private publicService:PublicService) { }

  placeAddForm!: FormGroup;
  about!: About;

  createPlaceFrom() {
    this.placeAddForm = this.formBuilder.group({
      text: ['',Validators.required],
    });
  }

  ngOnInit() {
    this.editor = new Editor();
    this.createPlaceFrom();
  }

  update() {
    if (this.placeAddForm.valid) {
      this.about = Object.assign({}, this.placeAddForm.value);
      this.publicService.updateAbout(this.about);
    }
  }

}
