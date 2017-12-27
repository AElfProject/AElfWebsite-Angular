import {Injectable} from '@angular/core';
import has = Reflect.has;
declare let $: any;

@Injectable()
export class FontFamliyService {

  private FontFamily = {
    'ff-cgb': {
      'English': 'ff-cgb-en',
      'Chinese': 'ff-cgb-zh',
      'Japanese': 'ff-cgb-ja'
    },
    'ff-arial': {
      'English': 'ff-arial-en',
      'Chinese': 'ff-arial-zh',
      'Japanese': 'ff-arial-ja'
    },
    'ff-cg': {
      'English': 'ff-cg-en',
      'Chinese': 'ff-cg-zh',
      'Japanese': 'ff-cg-ja'
    },
    'ff-dbb': {
      'English': 'ff-Dbb-en',
      'Chinese': 'ff-Dbb-zh',
      'Japanese': 'ff-Dbb-ja'
    },
    'ff-hnlt': {
      'English': 'ff-hnlt-en',
      'Chinese': 'ff-hnlt-zh',
      'Japanese': 'ff-hnlt-ja'
    },
    'ff-my': {
      'English': 'ff-my-en',
      'Chinese': 'ff-my-zh',
      'Japanese': 'ff-my-ja'
    },
    'ff-ss': {
      'English': 'ff-ss-en',
      'Chinese': 'ff-ss-zh',
      'Japanese': 'ff-ss-ja'
    },
    'ff-tnri': {
      'English': 'ff-tnri-en',
      'Chinese': 'ff-tnri-zh',
      'Japanese': 'ff-tnri-ja'
    }
  };
  public ffArial = '';
  public ffCg = '';
  public ffCgb = '';
  public ffDbb = '';
  public ffHnlt = '';
  public ffMy = '';
  public ffSs = '';
  public ffTnri = '';

  getFontFamily(language: string, cssClass: string): string {
    return this.FontFamily[cssClass][language];
  }
  changeFontFamily(language: string) {
    this.ffArial = this.getFontFamily(language, 'ff-arial');
    this.ffCg = this.getFontFamily(language, 'ff-cg');
    this.ffCgb = this.getFontFamily(language, 'ff-cgb');
    this.ffDbb = this.getFontFamily(language, 'ff-dbb');
    this.ffHnlt = this.getFontFamily(language, 'ff-hnlt');
    this.ffMy = this.getFontFamily(language, 'ff-my');
    this.ffSs = this.getFontFamily(language, 'ff-ss');
    this.ffTnri = this.getFontFamily(language, 'ff-tnri');
    const font = 'STHeiti Light';
    if (language === 'Japanese') {
      $('body').attr('style', 'font-family: "MS PGothic", Osaka, Arial, sans-serif !important');
    } else {
      $('body').attr('style', 'font-family: "Microsoft Yahei", arial, Helvetica !important');
    }
  }
}
