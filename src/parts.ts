import { MyDisplay } from '../core/myDisplay';
import { Tween } from '../core/tween';
import { DisplayConstructor } from '../libs/display';
import { Util } from '../libs/util';
import { Val } from '../libs/val';

export class Parts extends MyDisplay {

  private _showRate: Val = new Val(0);

  private _moveRate: Val = new Val(0);
  private _isMove: boolean = false;

  private _eyeList: Array<string> = [
    '👁',
    '👁',
    '👁',
    '●',
    '○',
    '👁️‍🗨️',
    '？',
  ]
  private _mayuList: Array<string> = [
    '-',
    '眉',
    '=',
    '〜',
    '"',
    '〃',
    '〝',
    '〟',
  ]
  private _mouseList: Array<string> = [
    '👄',
    '口',
    '-',
    '_',
    '🔺',
    '○',
    '●',
    '〜',
  ]
  
  private _size: number = 10

  private _eye: string = ''
  private _mayu: string = ''
  private _mouse: string = ''

  private _mayuSize: number = 1
  private _eyeSize: number = 1
  private _mouseSize: number = 1

  constructor(opt: DisplayConstructor) {
    super(opt);
  }

  // 
  private _reset(): void {
    this._size = Util.randomInt(3, 10)

    this._eye = Util.randomArr(this._eyeList)
    this._mayu = Util.randomArr(this._mayuList)
    this._mouse = Util.randomArr(this._mouseList)

    this._eyeSize = Util.randomInt(20, 80)
    this._mayuSize = Util.randomInt(9, 35)
    this._mouseSize = Util.randomInt(9, 18)

    Tween.set(this.el, {
      fontSize: this._eyeSize + 'px',
    })
  }

  // 
  public show(d:number): void {
    this._reset();

    Tween.a(this._showRate, {
      val: [0, 1]
    }, 0.25, d)
    this._update();
  }

  // 
  private _move(): void {
    if(this._isMove) return;
    this._isMove = true;

    const t = Util.random(0.1, 0.25)
    Tween.a(this._moveRate, {
      val:[0, 1]
    }, t, 0, Tween.EaseNone, null, null, () => {
      Tween.a(this._moveRate, {
        val:0
      }, t, 0, Tween.EaseNone, null, null, () => {
        this._isMove = false;
        if(Util.hit(2)) this._move();
      })
    })
  }

  // 更新
  protected _update(): void {
    super._update();

    const t = this._showRate.val >= 0.9 ? (this._eye + this._eye) : '';

    let a = '';
    const num = ~~(Util.map(this._showRate.val, 0, this._size, 0, 1));
    for (let i = 0; i < num; i++) {
      a += this._mayu;
    }
    const r = a + ' ' + a;

    const ruby = `<ruby>${t}<rt>${r}</rt></ruby>`;
    this.el.innerHTML = ruby + `<br><span>${this._mouse}</span>`;
    // this.el.innerHTML = ruby;

    Tween.set(this.qs('rt'), {
      fontSize: this._mayuSize + 'px',
      // marginBottom: '1em',
    })
    Tween.set(this.qs('span'), {
      fontSize: this._mouseSize + 'px',
      // color: '#FF0000'
    })

    if(this._showRate.val >= 1) {
      if(Util.hit(100)) {
        this._move();
      }
    }

    Tween.set(this.el, {
      opacity: this._showRate.val > 0 ? 1 : 0,
      y: this._moveRate.val * -10,
    })
  }
}

