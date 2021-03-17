import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/classes/media-item';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, OnChanges {

  @Input('items') items: MediaItem[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.items);
  }
  
  ngOnChanges() {
    console.log(this.items);
  }

}
