import { TestBed, fakeAsync } from '@angular/core/testing';

import * as faker from 'faker';

import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('LoadImages', () => {
    let countOfImages = 0;
    beforeEach(() => {
      countOfImages =
        Math.trunc(window.innerWidth / 350) *
        (Math.trunc((window.innerHeight - 100) / 350) + 1);
    });

    it('should update imagesync value', () => {
      spyOn(service.imagesSink, 'next');
      service.loadImages();
      expect(service.imagesSink.value.length).toEqual(countOfImages);
      expect(service.imagesSink.next).toHaveBeenCalled();
    });
  });
});
