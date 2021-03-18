import { Component, Input, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/classes/media-item';
import { MediaLoaderService } from 'src/app/services/media-loader.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  @Input('item') item: MediaItem = new MediaItem;

  constructor(
    private mediaLoader: MediaLoaderService,
  ) { }

  ngOnInit(): void {
    this.mediaLoader.load(this.item).catch(() => {
      this.item.error = true;
    }).finally(() => {
      this.item.loaded = true;
    });
  }

}
