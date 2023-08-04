import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPetComponent } from './eliminar-pet.component';

describe('EliminarPetComponent', () => {
  let component: EliminarPetComponent;
  let fixture: ComponentFixture<EliminarPetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarPetComponent]
    });
    fixture = TestBed.createComponent(EliminarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
