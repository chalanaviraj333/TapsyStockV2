import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarnotesPage } from './carnotes.page';

describe('CarnotesPage', () => {
  let component: CarnotesPage;
  let fixture: ComponentFixture<CarnotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarnotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
