import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';


export function swipe(stateChangeExpr: string, styleInit, styleEnter, styleLeave) {
  return transition(stateChangeExpr, [
    query(
      ':enter, :leave',
      style({ position: 'absolute', top: 0, width: '100%', opacity: 0 }),
      { optional: true },
    ),
    query(':leave', [
      style({ opacity: 1, ...styleInit }),
      animate('0.3s ease-in', style({ opacity: 0, ...styleLeave })),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, ...styleEnter }),
      animate('0.3s ease-out', style({ opacity: 1, ...styleInit })),
    ], { optional: true }),
  ]);
}
