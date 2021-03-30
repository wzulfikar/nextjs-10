import { events } from '@src/config/analytic';
import { trackGoal as _trackGoal } from '@src/lib/analytic';

export default function trackGoal(
  event: keyof typeof events,
  centValue?: number
) {
  if (process.env.NODE_ENV === 'production') {
    _trackGoal({ ...events[event], centValue });
  } else {
    console.log('[dev][analytic] trackGoal:', events[event]);
  }
}
