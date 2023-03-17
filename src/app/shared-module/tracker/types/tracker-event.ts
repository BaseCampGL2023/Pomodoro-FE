import { TrackerDurationEnum } from './tracker-duration.enum';
import { TrackerEventEnum } from './tracker-event.enum';

export class TrackerEvent {
  constructor(
    public eventType: TrackerEventEnum,
    public duration: TrackerDurationEnum
  ) {}
}
