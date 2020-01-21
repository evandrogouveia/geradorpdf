import { Component, OnInit, ViewChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
 
  isCollapsed = false;
  private _opened: boolean = true;
  private _mode: string = 'slide';
  
  tab = 1;
  
  constructor(public translate: TranslateService) {
    translate.addLangs(['Pt', 'En']);
    translate.setDefaultLang('Pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/Pt|En/) ? browserLang : 'Pt');
   }

  ngOnInit() {
    return this._mode;
  }

  setTab(num: number) {
    this.tab = num;
  }

  isSelected(num: number) {
    return this.tab === num;
  }

}
