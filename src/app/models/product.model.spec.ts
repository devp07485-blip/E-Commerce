import { Product } from './product.model';

describe('Product model', () => {
  it('should create a Product object', () => {
    const p: Product = {
      id: 1,
      name: 'Test',
      price: 100
    };

    expect(p.name).toBe('Test');
  });
});
