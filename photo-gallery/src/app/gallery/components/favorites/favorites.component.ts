import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { Image } from '../../models/gallery.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private galleryService: GalleryService,
    private router: Router,
  ) {}

  public favorite$: Observable<Image[]> = this.galleryService.favoriteImages$;

  ngOnInit(): void { }

  public viewImage(id: number): void {
    this.router.navigate(['favorites', id]);
  }
}
