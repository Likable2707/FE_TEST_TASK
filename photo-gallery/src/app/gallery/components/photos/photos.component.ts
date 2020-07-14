import { Component, OnInit, HostListener } from '@angular/core';

import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'pg-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public images$ = this.galleryService.images$;
  public isLoading = false;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.images$.subscribe(() => this.isLoading = false);
  }

  public onScrollDown(): void {
    this.isLoading = true;
    this.galleryService.loadImages();
  }

  public addToFavorite(idx: number): void {
    this.galleryService.addToFavorite(idx);
  }

}
