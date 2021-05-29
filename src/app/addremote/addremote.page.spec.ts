import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddremotePage } from './addremote.page';

describe('AddremotePage', () => {
  let component: AddremotePage;
  let fixture: ComponentFixture<AddremotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddremotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddremotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
