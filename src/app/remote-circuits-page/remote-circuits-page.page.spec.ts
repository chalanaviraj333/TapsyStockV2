import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemoteCircuitsPagePage } from './remote-circuits-page.page';

describe('RemoteCircuitsPagePage', () => {
  let component: RemoteCircuitsPagePage;
  let fixture: ComponentFixture<RemoteCircuitsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteCircuitsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteCircuitsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
