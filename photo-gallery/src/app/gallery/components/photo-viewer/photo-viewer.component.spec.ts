import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
} from '@angular/core/testing';

import { PhotoViewerComponent } from './photo-viewer.component';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { Image } from '../../models/gallery.model';
import { By } from '@angular/platform-browser';

const mockImage: Image = { id: 1, url: 'url', isFavorite: true };

class ActivatedRouteStub {
  public params: Observable<any> = of({ id: 'id' });
}

class RouterStub {
  public navigate = (route: any) => {};
}

class GalleryServiceStub {
  public findImageById = () => mockImage;
  public removeFromFavorite = () => {};
}

describe('PhotoViewerComponent', () => {
  let component: PhotoViewerComponent;
  let fixture: ComponentFixture<PhotoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
        {
          provide: Router,
          useClass: RouterStub,
        },
        {
          provide: GalleryService,
          useClass: GalleryServiceStub,
        },
      ],
      declarations: [PhotoViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get image from router params', async(
    inject([ActivatedRoute], (route) => {
      route.params.subscribe((params) => expect(params.id).toEqual('id'));
      component.ngOnInit();
      expect(component.image).toEqual(mockImage);
    })
  ));

  it('should unsubscrie from router params', () => {
    const spyOnRoute = spyOn(component.routeSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyOnRoute).toHaveBeenCalled();
  });

  it('should remove from favorites on button click', fakeAsync(inject([Router, GalleryService], (router, galleryService)  => {
    spyOn(galleryService, 'removeFromFavorite');
    spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('.photo-viewer__remove-button')).nativeElement;
    button.click();
    expect(galleryService.removeFromFavorite).toHaveBeenCalledWith(mockImage.id);
    expect(router.navigate).toHaveBeenCalledWith(['favorites']);
  })));
});
