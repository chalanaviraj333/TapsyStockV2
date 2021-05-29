import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KdbladesPage } from './kdblades.page';

describe('KdbladesPage', () => {
  let component: KdbladesPage;
  let fixture: ComponentFixture<KdbladesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KdbladesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KdbladesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
