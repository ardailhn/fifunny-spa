import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css']
})
export class AdminCommentComponent implements OnInit {

  constructor(private placeService:PlaceService) { }

  comments: Comment[] = [];

  ngOnInit() {
    this.getComment();
  }

  getComment() {
    this.placeService.getCommentsAdmin().subscribe(data => {
      this.comments = data;
    })
  }

  deleteComment(id: number) {
    this.placeService.deleteComment(id);
  }

  verifyComment(id: number) {
    this.placeService.verifyComment(id);
  }

}
