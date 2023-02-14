export class BarPlotVM {
  constructor(
    public yAxisTitle?: string,
    public xAxisTitle?: string,
    public tooltipTitle?: string,
    public dataSequence: BarPlotUnitVM[] = []
  ) {}
}

export class BarPlotUnitVM {
  constructor(
    public barTitle: string,
    public value: number,
    public tooltipValue?: string
  ) {}
}
