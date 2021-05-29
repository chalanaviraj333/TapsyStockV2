import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MfkPagePage } from './mfk-page.page';

describe('MfkPagePage', () => {
  let component: MfkPagePage;
  let fixture: ComponentFixture<MfkPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfkPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MfkPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
