import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostModalComponent } from './new-post-modal.component';

describe('NewPostComponent', () => {
  let component: NewPostModalComponent;
  let fixture: ComponentFixture<NewPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
