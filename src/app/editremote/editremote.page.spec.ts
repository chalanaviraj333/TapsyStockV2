import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditremotePage } from './editremote.page';

describe('EditremotePage', () => {
  let component: EditremotePage;
  let fixture: ComponentFixture<EditremotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditremotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditremotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
