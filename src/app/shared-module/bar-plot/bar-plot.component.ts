import { Component, Input } from '@angular/core';

import { BarPlotVM } from './bar-plot-vm';

@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: ['./bar-plot.component.scss']
})
export class BarPlotComponent {
  @Input()
  viewModel = new BarPlotVM();

  yAxis: string[] = [];

  ngOnInit(){
    console.log(this.viewModel);

    this.yAxis = this.calcYAxis(this.viewModel.dataSequence.map(ds => ds.value));
  }

  calcYAxis(values: number[]): string[]{
    let max = Math.max(...values);
    // return [
    //   Math.floor(max * 100) / 100,
    //   Math.floor(max * 75) / 100,
    //   Math.floor(max * 50) / 100,
    //   Math.floor(max * 25) / 100,
    //   0
    // ];
    return [
      max.toFixed(0),
      (max * 0.75).toFixed(0),
      (max * 0.5).toFixed(0),
      (max * 0.25).toFixed(0),
      '0'
    ]
  }

  calcBarHeight(value: number): number {
    return (value / Number(this.yAxis[0])) * 100;
  }
}
