import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsmlEditorComponent } from './ssml-editor.component';

describe('SsmlEditorComponent', () => {
  let component: SsmlEditorComponent;
  let fixture: ComponentFixture<SsmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsmlEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
