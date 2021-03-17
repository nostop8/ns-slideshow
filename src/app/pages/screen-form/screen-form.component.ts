import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-screen-form',
  templateUrl: './screen-form.component.html',
  styleUrls: ['./screen-form.component.scss']
})
export class ScreenFormComponent implements OnInit {

  screenKey = '';
  errorMessage = '';
  playPromise: Promise<any> | null = null;

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async play() {
    this.errorMessage = '';
    if (!this.screenKey) {
      this.errorMessage = 'Please enter a screen key.';
      return;
    }
    try {
      await this.playlistService.getPlaylists(this.screenKey);
      this.router.navigate(['screen', this.screenKey]);
    } catch (e) {
      this.errorMessage = "Unable to fetch data from the remote service. Please make sure you've entered a correct screen key!"
    }
  }

}
