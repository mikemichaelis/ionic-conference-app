import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[elastic-profile]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})

export class ElasticProfile {

  header: any;
  headerHeight: any;
  translateAmt: any;
  scaleAmt: any;

  constructor(public element: ElementRef, public renderer: Renderer) {
    // console.log("directive running");
  }

  ngOnInit() {
    //let content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header = this.element.nativeElement.getElementsByClassName('profile-images')[0];
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
  }

  onWindowResize(ev) {
    // console.log("window");
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev) {
    // console.log("scroll");
    ev.domWrite(() => {
      this.updateParallaxHeader(ev);
    });
  }

  updateParallaxHeader(ev) {
    if (ev.scrollTop >= 0) {
      this.translateAmt = ev.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
    }
    this.renderer.setElementStyle(this.header, 'transform', 'translate3d(0,' + this.translateAmt + 'px,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')');
  }
}
