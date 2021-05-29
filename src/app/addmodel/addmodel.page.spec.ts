import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmodelPage } from './addmodel.page';

describe('AddmodelPage', () => {
  let component: AddmodelPage;
  let fixture: ComponentFixture<AddmodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmodelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
