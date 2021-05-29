import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemotedetailsPage } from './remotedetails.page';

describe('RemotedetailsPage', () => {
  let component: RemotedetailsPage;
  let fixture: ComponentFixture<RemotedetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemotedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemotedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
