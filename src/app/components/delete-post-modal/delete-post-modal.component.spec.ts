import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostModalComponent } from './delete-post-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeletePostModalComponent;
  let fixture: ComponentFixture<DeletePostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePostModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
