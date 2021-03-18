import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MediaItem } from '../classes/media-item';

@Injectable({
  providedIn: 'root'
})
export class MediaLoaderService {

  private items: {
    [key: string]: Promise<boolean>
  } = {};

  private hiddenElement: HTMLElement | null = null;

  private loaders = {
    img: (media: MediaItem) => this.loadImg(media),
    video: (media: MediaItem) => this.loadVideo(media),
    unknown: (media: MediaItem) => Promise.reject(false),
  };

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public load(media: MediaItem) {
    if (this.items[media.src]) {
      return this.items[media.src];
    }
    return this.items[media.src] = this.loaders[media.type](media);
  }

  private loadVideo(media: MediaItem) {
    return new Promise<boolean>((s, e) => {
      const video = this.renderer.createElement('video') as HTMLVideoElement;
      this.renderer.setProperty(video, 'onloadeddata', () => {
        s(true);
      });
      this.renderer.setProperty(video, 'onerror', () => {
        e(false);
      });
      this.renderer.setAttribute(video, 'src', media.src);
      this.renderer.setAttribute(video, 'type', 'video/' + media.extension);
      this.attachHiddenElement(video);
    });
  }

  private loadImg(media: MediaItem) {
    return new Promise<boolean>((s, e) => {
      const img = this.renderer.createElement('img') as HTMLImageElement;
      this.renderer.setProperty(img, 'onload', () => {
        s(true);
      });
      this.renderer.setProperty(img, 'onerror', () => {
        e(true);
      });
      this.renderer.setAttribute(img, 'src', media.src);
      this.attachHiddenElement(img);
    });
  }

  /**
   * Some browsers require the media item to be in the actual DOM to begin loading.
   * @param element 
   */
  private attachHiddenElement(element: HTMLElement) {
    if (!this.hiddenElement) {
      this.hiddenElement = this.renderer.createElement('div') as HTMLElement;
      this.renderer.setStyle(this.hiddenElement, 'display', 'none');
      this.renderer.appendChild(this.document.body, this.hiddenElement);
    }
    this.renderer.appendChild(this.hiddenElement, element);
  }

}
