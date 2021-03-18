import { Component, Input, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/classes/media-item';
import { MediaLoaderService } from 'src/app/services/media-loader.service';

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

  paused = false;

  constructor(
    private mediaLoader: MediaLoaderService,
  ) { }

  ngOnInit(): void {
    if (!this.items.length) {
      return;
    }
    this.changeActiveItem(false);
    this.mediaLoader.load(this.items[this.index]).finally(() => {
      this.changeActiveItem(true);
    });
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

  pause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.clockDown();
    } else {
      clearTimeout(this.timer);
    }
  }

  changeActiveItem(startClock = true) {
    this.activeItem = this.items[this.index];
    if (!startClock) {
      return;
    }
    this.timeLeft = this.activeItem.duration;
    clearTimeout(this.timer);
    this.clockDown();
  }

  clockDown() {
    if (this.paused) {
      return;
    }
    this.timer = setTimeout(() => {
      if (this.timeLeft <= 0) {
        return this.next();
      }
      this.timeLeft--;
      this.clockDown();
    }, 1000);
  }

}
