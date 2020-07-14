import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Image } from '../../models/gallery.model';

@Component({
  selector: 'pg-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  public routeSub: Subscription;
  public image: Image;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.image = this.galleryService.findImageById(Number(params.id));
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public removeFromFavorite(): void {
    this.galleryService.removeFromFavorite(this.image.id);
    this.router.navigate(['favorites']);
  }
}
