export interface Task {
  id: string;
  title: string;
  frequency: string;
  allocatedTime: number;
  initialDate: Date;
  progress: number;
}
