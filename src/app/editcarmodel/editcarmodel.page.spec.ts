import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcarmodelPage } from './editcarmodel.page';

describe('EditcarmodelPage', () => {
  let component: EditcarmodelPage;
  let fixture: ComponentFixture<EditcarmodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcarmodelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcarmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
