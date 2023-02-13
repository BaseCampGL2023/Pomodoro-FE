export class BarPlotVM {
    constructor(
        public title?: string,
        public tooltipTitle?: string,
        public dataSequence: BarPlotUnitVM[] = []
    ){}
}

export class BarPlotUnitVM {
    constructor(
        public barTitle: string,
        public value: number,
        public tooltipValue?: string
    ){}
}