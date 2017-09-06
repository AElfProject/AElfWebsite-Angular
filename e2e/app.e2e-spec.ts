import { GridWebsitePage } from './app.po';

describe('grid-website App', () => {
  let page: GridWebsitePage;

  beforeEach(() => {
    page = new GridWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
