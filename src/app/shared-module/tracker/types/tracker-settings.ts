export class TrackerSettings {
  constructor(
    public pomodoro: number = 25,
    public longBreak: number = 15,
    public shortBreak: number = 5,
    public pomodorosBeforeLongBreak: number = 4,
    public autostartEnabled: boolean = false
  ) {}
}
