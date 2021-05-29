import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprogrammingdetailsPage } from './addprogrammingdetails.page';

describe('AddprogrammingdetailsPage', () => {
  let component: AddprogrammingdetailsPage;
  let fixture: ComponentFixture<AddprogrammingdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprogrammingdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprogrammingdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
