import { Func } from '../core/func';
import { MyDisplay } from '../core/myDisplay';
import { Parts } from './parts';
import './style.css'

export class Main extends MyDisplay {
  private _parts: Array<Parts> = [];

  constructor(opt: any) {
    super(opt);

    const num = Func.val(3, 30);
    for (let i = 0; i < num; i++) {
      const el = document.createElement('div');
      el.classList.add('l-item');
      this.el.appendChild(el);

      const p = new Parts({
        el: el,
        dispId: i,
      });

      this._parts.push(p);
    }

    this._change();
  }


  private _change(): void {
    this._parts.forEach((p,i) => {
      p.show(i * 0.05);
    })
  }


  // 更新
  protected _update(): void {
    super._update();

    if(this._c % 200 == 0) {
      this._change();
    }
  }
}


new Main({
  el: document.querySelector('.l-main'),
})