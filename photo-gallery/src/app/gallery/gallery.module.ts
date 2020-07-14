import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PhotosComponent } from './components/photos/photos.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PhotosComponent, FavoritesComponent, PhotoViewerComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class GalleryModule { }
