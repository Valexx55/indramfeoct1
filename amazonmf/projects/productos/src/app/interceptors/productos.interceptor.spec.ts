import { TestBed } from '@angular/core/testing';

import { ProductosInterceptor } from './productos.interceptor';

describe('ProductosInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProductosInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProductosInterceptor = TestBed.inject(ProductosInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
