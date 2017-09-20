import {Injectable} from '@angular/core';

@Injectable()
export class FontFamliyService {

  FontFamily = {
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

  getFontFamily(language: string, cssClass: string): string {
    return this.FontFamily[cssClass][language];
  }
}
