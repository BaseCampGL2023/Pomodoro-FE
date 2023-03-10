export interface TaskResult {
  taskId: string;
  title: string;
  initialDate: string;
  allocatedTime: 23;
  frequencyData: {
    frequencyTypeValue: number;
    isCustom: boolean;
    every: number;
  };
  userId: string;
}
