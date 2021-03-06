import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaItem } from 'src/app/classes/media-item';
import { PlaylistService } from 'src/app/services/playlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, OnDestroy {

  loading = true;
  error = false;

  playlists: MediaItem[][] = [];

  routeSubscription = new Subscription();

  constructor(
    private playlistService: PlaylistService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeSubscription = this.activeRoute.params.subscribe(params => {
      this.loadPlaylists(params.screen_key);
    });
  }

  async loadPlaylists(key: string) {
    this.loading = true;
    try {
      this.playlists = (await this.playlistService.getPlaylists(key)).map(playlist => {
        const mediaItems: MediaItem[] = [];
        playlist.playlistItems.forEach(item => {
          const mediaItem = new MediaItem;
          Object.assign(mediaItem, item);
          mediaItem.src = `${environment.mediaEndpoint}/${mediaItem.creativeKey}`;
          if (mediaItem.type == 'unknown') {
            // return;
          }
          mediaItems.push(mediaItem);
        });
        return mediaItems;
      });
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
