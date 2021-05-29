import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcarbrandPage } from './addcarbrand.page';

describe('AddcarbrandPage', () => {
  let component: AddcarbrandPage;
  let fixture: ComponentFixture<AddcarbrandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcarbrandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcarbrandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
