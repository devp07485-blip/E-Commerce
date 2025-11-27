import { CartItem } from './cart-item.model';

describe('CartItem Class', () => {
  it('should create an instance', () => {
    const item = new CartItem(1, 'Burger', 100, 2);
    expect(item).toBeTruthy();
  });
});
