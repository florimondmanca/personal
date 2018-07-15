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


export const homeSwipeAnimation = trigger('homeSwipe', [
  swipe(
    'home => blog',
    { transform: 'translateX(0)' },
    { transform: 'translateX(30px)' },
    { transform: 'translateX(-30px)' },
  ),
  swipe(
    'blog => home',
    { transform: 'translateX(0)' },
    { transform: 'translateX(-30px)' },
    { transform: 'translateX(30px)' },
  ),

]);
