export class Settings {
  constructor(
    public id: string,
    public userId: string,
    public pomodoroDuration: number,
    public longBreak: number,
    public shortBreak: number,
    public pomodorosBeforeLongBreak: number,
    public autostartEnabled: boolean
  ) {}
}
