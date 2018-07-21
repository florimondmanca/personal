import { trigger } from '@angular/animations';
import { swipe } from 'app/core/animations';

export const swipeAnimation = trigger('swipe', [
  swipe(
    '* <=> *',
    { transform: 'translateY(0)' },
    { transform: 'translateY(-10px)' },
    { transform: 'translateY(-10px)' },
  ),
]);
