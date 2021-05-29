import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LowstockPagePage } from './lowstock-page.page';

describe('LowstockPagePage', () => {
  let component: LowstockPagePage;
  let fixture: ComponentFixture<LowstockPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowstockPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LowstockPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
