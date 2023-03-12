import { Frequency } from './frequency';

export interface Task {
  id: string;
  title: string;
  frequency: Frequency;
  allocatedTime: number;
  initialDate: Date;
}
