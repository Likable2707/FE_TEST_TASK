import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { Image } from '../models/gallery.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  public countOfImages: number;
  public imagesSink: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  public images$: Observable<Image[]> = this.imagesSink.asObservable().pipe(
    delay((200 + Math.random() * (300 - 200))),
    tap((data) => localStorage.setItem('images', JSON.stringify(data)))
  );
  public favoriteImages$: Observable<Image[]> = this.imagesSink
    .asObservable()
    .pipe(
      map((images: Image[]) =>
        images.filter((image: Image) => image.isFavorite)
      )
    );

  constructor() {
    this.setImagesCount();
    if (localStorage.getItem('images')) {
      this.imagesSink.next([
        ...this.imagesSink.value,
        ...JSON.parse(localStorage.getItem('images')),
      ]);
    } else {
      this.loadImages();
    }
  }

  public loadImages(): void {
    const images: Image[] = [];

    for (let i = 0; i < this.countOfImages; i++) {
      images.push({
        id: this.imagesSink.value.length + i,
        isFavorite: false,
        url: faker.image.image(),
      });
    }

    this.imagesSink.next([...this.imagesSink.value, ...images]);
  }

  public addToFavorite(idx: number): void {
    this.imagesSink.value[idx].isFavorite = true;
    localStorage.setItem('images', JSON.stringify(this.imagesSink.value));
  }

  public findImageById(id: number): Image {
    return this.imagesSink.value.find((image) => image.id === id);
  }

  public removeFromFavorite(id: number): void {
    const imgIndex = this.imagesSink.value.findIndex(
      (image: Image) => image.id === id
    );
    this.imagesSink.value[imgIndex].isFavorite = false;
    localStorage.setItem('images', JSON.stringify(this.imagesSink.value));
  }

  private setImagesCount(): void {
    this.countOfImages =
      Math.trunc(window.innerWidth / 350) *
      (Math.trunc((window.innerHeight - 100) / 350) + 1);
  }
}
