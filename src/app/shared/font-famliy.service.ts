import {Injectable} from '@angular/core';

@Injectable()
export class FontFamliyService {

  private FontFamily = {
    'ff-cgb': {
      'English': 'ff-cgb-en',
      'Chinese': 'ff-cgb-zh'
    },
    'ff-arial': {
      'English': 'ff-arial-en',
      'Chinese': 'ff-arial-zh'
    },
    'ff-cg': {
      'English': 'ff-cg-en',
      'Chinese': 'ff-cg-zh'
    },
    'ff-dbb': {
      'English': 'ff-Dbb-en',
      'Chinese': 'ff-Dbb-zh'
    },
    'ff-hnlt': {
      'English': 'ff-hnlt-en',
      'Chinese': 'ff-hnlt-zh'
    },
    'ff-my': {
      'English': 'ff-my-en',
      'Chinese': 'ff-my-zh'
    },
    'ff-ss': {
      'English': 'ff-ss-en',
      'Chinese': 'ff-ss-zh'
    },
    'ff-tnri': {
      'English': 'ff-tnri-en',
      'Chinese': 'ff-tnri-zh'
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
  }
}
