import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MediaItem } from 'src/app/classes/media-item';
import { MediaLoaderService } from 'src/app/services/media-loader.service';
import { MediaComponent } from '../media/media.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input('items') items: MediaItem[] = [];

  @ViewChildren(MediaComponent) mediaComponents!: QueryList<MediaComponent>;

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
    const video = this.findMediaVideo(this.activeItem);
    if (!this.paused) {
      this.clockDown();
      video?.play();
    } else {
      clearTimeout(this.timer);
      video?.pause();
    }
  }

  changeActiveItem(startClock = true) {
    // Pause possible video.
    this.findMediaVideo(this.activeItem)?.pause();

    this.activeItem = this.items[this.index];
    if (!startClock) {
      return;
    }
    this.timeLeft = this.activeItem.duration;
    clearTimeout(this.timer);
    this.clockDown();

    // Play possible video.
    const videoEl = this.findMediaVideo(this.activeItem);
    if (videoEl) {
      videoEl.currentTime = 0;
    }
    if (!this.paused) {
      videoEl?.play();
    }
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

  findMediaVideo(media: MediaItem | null) {
    return this.mediaComponents?.filter(mediaComponent => {
      return mediaComponent.item === media;
    })[0].videoElement?.nativeElement;
  }

}
