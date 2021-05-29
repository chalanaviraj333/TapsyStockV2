import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GarageDoorRemotesPage } from './garage-door-remotes.page';

describe('GarageDoorRemotesPage', () => {
  let component: GarageDoorRemotesPage;
  let fixture: ComponentFixture<GarageDoorRemotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageDoorRemotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GarageDoorRemotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
