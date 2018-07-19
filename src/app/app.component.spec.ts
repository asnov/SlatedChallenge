import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetFilmsService } from './services/get-films.service';
import { HttpClient } from '@angular/common/http';
import { SanitizePipe } from './pipes/sanitize.pipe';


const getFilmsServiceStub: Partial<GetFilmsService> = {
  getFilmsByName: jasmine.createSpy(),
};

const sanitizePipeStub: Partial<SanitizePipe> = {
  transform(s: string) {
    return s;
  }
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: GetFilmsService, useValue: getFilmsServiceStub},
        {provide: HttpClient, useValue: {}},
        {provide: SanitizePipe, useValue: sanitizePipeStub},
      ],

    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  it('should contain input box', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const inputEl = compiled.querySelector<HTMLInputElement>('input');
    expect(inputEl).toBeTruthy();
  });

  describe('input box', () => {

    it('should receive updated string every keypress', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled: HTMLElement = fixture.debugElement.nativeElement;
      const inputEl = compiled.querySelector<HTMLInputElement>('input');
      const app: AppComponent = fixture.debugElement.componentInstance;

      expect(app.searchString).toEqual('');
      inputEl.value = 'dddddd';
      inputEl.dispatchEvent(new Event('keyup'));
      // fixture.detectChanges();
      expect(app.searchString).toEqual('dddddd');
    });

    it('should initiate a new call to the API every keypress', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const getFilmsService1 = fixture.debugElement.injector.get(GetFilmsService);
      const getFilmsService2 = TestBed.get(GetFilmsService);

      const compiled: HTMLElement = fixture.debugElement.nativeElement;
      const inputEl = compiled.querySelector<HTMLInputElement>('input');

      const app: AppComponent = fixture.debugElement.componentInstance;


      inputEl.value = 'dddddd';
      const keyUpEvent = new Event('keyup');  // as KeyboardEvent
      inputEl.dispatchEvent(keyUpEvent);
      fixture.detectChanges();

      expect(app.searchString).toEqual('dddddd');


      console.log(getFilmsServiceStub);
      console.log(getFilmsService1);
      console.log(getFilmsService2);

      console.log((getFilmsServiceStub.getFilmsByName as any).calls.count());
      console.log((getFilmsService1.getFilmsByName as any).calls);
      console.log(getFilmsService2.getFilmsByName.calls.count());

    }));

    it('should display all of the results immediately below the box');

    describe('results', () => {
      it('should include the film’s image');

      it('the film’s name or linked name');
    });

  });

});
