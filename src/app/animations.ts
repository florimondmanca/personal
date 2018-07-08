import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      style({ position: 'fixed', width: '100%' }),
      { optional: true },
    ),
    query(':enter', [
      style({ opacity: 0 }),
      animate('0.5s ease-in-out', style({ opacity: 1 })),
    ], { optional: true }),
  ]),
]);
