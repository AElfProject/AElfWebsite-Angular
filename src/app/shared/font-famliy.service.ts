import {Injectable} from '@angular/core';
import has = Reflect.has;
declare let $: any;

@Injectable()
export class FontFamliyService {

  private FontFamily = {
    'ff-cgb': {
      'English': 'ff-cgb-en',
      '中文': 'ff-cgb-zh',
      '日本語': 'ff-cgb-ja'
    },
    'ff-arial': {
      'English': 'ff-arial-en',
      '中文': 'ff-arial-zh',
      '日本語': 'ff-arial-ja'
    },
    'ff-cg': {
      'English': 'ff-cg-en',
      '中文': 'ff-cg-zh',
      '日本語': 'ff-cg-ja'
    },
    'ff-dbb': {
      'English': 'ff-Dbb-en',
      '中文': 'ff-Dbb-zh',
      '日本語': 'ff-Dbb-ja'
    },
    'ff-hnlt': {
      'English': 'ff-hnlt-en',
      '中文': 'ff-hnlt-zh',
      '日本語': 'ff-hnlt-ja'
    },
    'ff-my': {
      'English': 'ff-my-en',
      '中文': 'ff-my-zh',
      '日本語': 'ff-my-ja'
    },
    'ff-ss': {
      'English': 'ff-ss-en',
      '中文': 'ff-ss-zh',
      '日本語': 'ff-ss-ja'
    },
    'ff-tnri': {
      'English': 'ff-tnri-en',
      '中文': 'ff-tnri-zh',
      '日本語': 'ff-tnri-ja'
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
    if (language === '日本語') {
      $('body').attr('style', 'font-family: "MS PGothic", Osaka, Arial, sans-serif !important');
    } else {
      $('body').attr('style', 'font-family: "Microsoft Yahei", arial, Helvetica !important');
    }
  }
}
