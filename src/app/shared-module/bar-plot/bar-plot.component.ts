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

  @Input()
  isIntAxisLabel: boolean = false;

  yAxis: string[] = [];

  ngOnInit(){
    console.log(this.viewModel);

    this.yAxis = this.calcYAxis(this.viewModel.dataSequence.map(ds => ds.value));
  }

  calcYAxis(values: number[]): string[]{
    let max = Math.max(...values);
    let fixedTo: number;

    max = max % 1 === 0 ? max : Math.ceil(max);

    if(this.isIntAxisLabel){
      while(max % 4 !== 0){
        max++;
      }
    }

    if(max % 4 == 0){
      fixedTo = 0;
    }
    else if(max % 2 == 0) {
      fixedTo = 1;
    } else {
      fixedTo = 2
    }

    // if(max > 3 ){
      
    // } else if (max == 2) {
    //   fixedTo = 1;
    // } else if (max == 3 || max == 1) {
    //   fixedTo = 2;
    // }

    // let result = [
    //   max,
    //   max * 0.75,
    //   max * 0.5,
    //   max * 0.25,
    //   0
    // ];
    // return [
    //   Math.floor(max * 100) / 100,
    //   Math.floor(max * 75) / 100,
    //   Math.floor(max * 50) / 100,
    //   Math.floor(max * 25) / 100,
    //   0
    // ];
    return [
      max.toFixed(fixedTo),
      (max * 0.75).toFixed(fixedTo),
      (max * 0.5).toFixed(fixedTo),
      (max * 0.25).toFixed(fixedTo),
      0..toFixed(fixedTo)
    ]
  }

  calcBarHeight(value: number): number {
    return (value / Number(this.yAxis[0])) * 100;
  }
}
