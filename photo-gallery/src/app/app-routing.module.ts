import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './gallery/components/photos/photos.component';
import { FavoritesComponent } from './gallery/components/favorites/favorites.component';
import { PhotoViewerComponent } from './gallery/components/photo-viewer/photo-viewer.component';

const routes: Routes = [
    { path: '', component: PhotosComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'favorites/:id', component: PhotoViewerComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
