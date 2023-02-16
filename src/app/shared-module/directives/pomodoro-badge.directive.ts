import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPomodoroBadge]'
})
export class PomodoroBadgeDirective {

  constructor(element: ElementRef) {
    //check is it html element
    let radius = 15;
    let pomodoros = '4';

    let div = document.createElement('div');
    div.style.width = `${2 * radius}px`;
    div.style.height = `${2 * radius}px`;
    div.style.backgroundColor = "#cc5b53";
    div.style.borderRadius = "50%";
    div.style.position = "absolute";
    div.style.right = `-${radius}px`;
    div.style.top = `-${radius * 0.7}px`;
    div.style.textAlign = 'center';
    div.style.lineHeight = `${2.2 * radius}px`;
    div.style.fontSize = `${1.2*radius}px`;
    div.style.fontFamily = '"DM Sans", serif';
    div.style.color = '#f0f0f0';

    let img = document.createElement('div');
    img.style.width = `${2 * radius}px`;
    img.style.height = `${radius}px`
    img.innerHTML = `<svg style="position: absolute; top: 0px; left: 0px" width="${2 * radius}" height="${radius}" viewBox="0 0 275 113" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M125.09 19V0H138.59V19C191.59 17 291.69 41.3 272.09 68.5C252.49 95.7 175.257 54 138.59 40.5C174.757 80 187.09 105 176.59 108C149.208 115.823 117.22 53.5982 116.822 42.0007C111.085 73.6223 95.2747 128.866 75.59 108C55.59 86.8 87.9233 51.1667 106.59 36C67.9233 56.1667 -7.40999 90.9 0.590011 68.5C8.59001 46.1 86.9233 26.1667 125.09 19Z" fill="#34B456"/>
    </svg>`
    img.style.position = 'absolute';
    img.style.top = `${-0.25*radius}px`;
    img.style.left = '0px';

    // let text = document.createElement('p');
    // text.innerText = pomodoros;
    div.innerText = pomodoros;

    

  
    div.append(img);


    element.nativeElement.append(div);
  }

}



