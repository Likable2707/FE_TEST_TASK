import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { By } from '@angular/platform-browser';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  class RouterStub {
    public navigate = () => {};
  }

  class GalleryServiceStub {
    public favoriteImages$ = of([{ id: 'id', url: 'url', isFavorite: true}, { id: 'id2', url: 'url', isFavorite: true}]);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: RouterStub,
        },
        {
          provide: GalleryService,
          useClass: GalleryServiceStub,
        },
      ],
      declarations: [ FavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on image details page for the second image', fakeAsync(inject([Router], (router)  => {
    spyOn(router, 'navigate');
    const img = fixture.debugElement.queryAll(By.css('.favorite__item'))[1].nativeElement;
    img.click();
    expect(router.navigate).toHaveBeenCalledWith(['favorites', 'id2']);
  })));
});
