import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';
import { swipe } from 'app/core/animations';


export const fadeAnimation = trigger('fade', [
  transition('* => *', [
    query(
      ':enter',
      style({ position: 'fixed', width: '100%' }),
      { optional: true },
    ),
    query(':enter', [
      style({ opacity: 0 }),
      animate('1000ms ease-in-out', style({ opacity: 1 })),
    ], { optional: true }),
  ]),
]);


export const swipeAnimation = trigger('swipe', [
  swipe(
    'blog => about',
    { transform: 'translateX(0)' },
    { transform: 'translateX(30px)' },
    { transform: 'translateX(-30px)' },
  ),
  swipe(
    'about => blog',
    { transform: 'translateX(0)' },
    { transform: 'translateX(-30px)' },
    { transform: 'translateX(30px)' },
  ),

]);
