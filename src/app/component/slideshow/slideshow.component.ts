import { Component, Input, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/classes/media-item';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input('items') items: MediaItem[] = [];

  activeItem: MediaItem | null = null;

  index = 0;
  timeLeft = 0;
  timer = setTimeout(() => { }, 0);

  constructor() { }

  ngOnInit(): void {
    if (!this.items.length) {
      return;
    }
    this.changeActiveItem();
  }

  next() {
    if (this.index < this.items.length - 1) {
      this.index++
    } else {
      this.index = 0;
    }
    this.changeActiveItem();
  }

  previous() {
    if (this.index == 0) {
      this.index = this.items.length - 1;
    } else {
      this.index--;
    }
    this.changeActiveItem();
  }

  changeActiveItem() {
    this.activeItem = this.items[this.index];
    this.timeLeft = this.activeItem.duration;
    clearTimeout(this.timer);
    this.clockDown();
  }

  clockDown() {
    this.timer = setTimeout(() => {
      if (this.timeLeft <= 0) {
        return this.next();
      }
      this.timeLeft--;
      this.clockDown();
    }, 1000);
  }

}
