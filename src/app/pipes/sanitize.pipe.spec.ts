import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {

  it('create an instance', () => {
    const pipe = new SanitizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should delete all data- attributes', () => {
    const pipe = new SanitizePipe();
    expect(pipe.transform(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/30/18/93763/3_small.jpg?get=1462727108'
            alt='Altitude' class='filmIcon' data-tracked='False' data-id='20/93763' />`
    )).toEqual(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/30/18/93763/3_small.jpg?get=1462727108'
            alt='Altitude' class='filmIcon'  />`
    );
    expect(pipe.transform(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/72/40/207278/2_small.jpg?get=1515718324'
            alt='Altitude' class='filmIcon' data-tracked='False' />`
    )).toEqual(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/72/40/207278/2_small.jpg?get=1515718324'
            alt='Altitude' class='filmIcon'  />`
    );
    expect(pipe.transform(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/61/16/198419/1_small.jpg?get=1481065921'
            alt='Zeebo Newton' class='filmIcon'/>`
    )).toEqual(
      `<img src='https://s3.amazonaws.com/p.image.slated.com/film/61/16/198419/1_small.jpg?get=1481065921'
            alt='Zeebo Newton' class='filmIcon'/>`
    );
  });

});
