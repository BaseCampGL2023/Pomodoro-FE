import { Component, Input } from '@angular/core';

import { BarPlotVM } from './bar-plot-vm';

@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: ['./bar-plot.component.scss'],
})
export class BarPlotComponent {
  @Input()
  viewModel = new BarPlotVM();

  @Input()
  isIntAxisLabel = false;

  get yAxis() {
    return this.calcYAxis(this.viewModel.dataSequence.map((ds) => ds.value));
  }

  calcYAxis(values: number[]): string[] {
    let max = Math.max(...values);
    let fixedTo: number;

    max = max % 1 === 0 ? max : Math.ceil(max);

    if (this.isIntAxisLabel) {
      while (max % 4 !== 0) {
        max++;
      }
    }

    if (max % 4 == 0) {
      fixedTo = 0;
    } else if (max % 2 == 0) {
      fixedTo = 1;
    } else {
      fixedTo = 2;
    }

    return [
      max.toFixed(fixedTo),
      (max * 0.75).toFixed(fixedTo),
      (max * 0.5).toFixed(fixedTo),
      (max * 0.25).toFixed(fixedTo),
      (0).toFixed(fixedTo),
    ];
  }

  calcBarHeight(value: number): number {
    return (value / Number(this.yAxis[0])) * 100;
  }
}
