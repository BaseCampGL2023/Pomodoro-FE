export interface BarPlotVM {
    title: string;
    tooltipTitle: string;
    dataSequence: BarPlotUnitVM[];
}

export interface BarPlotUnitVM {
    barTitle: string;
    value: number;
    tooltipValue?: string;
}