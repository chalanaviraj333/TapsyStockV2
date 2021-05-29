import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KdRemotesPagePage } from './kd-remotes-page.page';

describe('KdRemotesPagePage', () => {
  let component: KdRemotesPagePage;
  let fixture: ComponentFixture<KdRemotesPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KdRemotesPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KdRemotesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
