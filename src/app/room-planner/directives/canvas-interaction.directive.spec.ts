import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CanvasInteractionDirective } from './canvas-interaction.directive';
import {
  CanvasInteractionEvent,
  CanvasInteractionEventTypeEnum,
} from '../interfaces/canvas-interactio-event.interface';
import { Room } from '../interfaces/room.interface';

@Component({
  template: `<canvas
    appCanvasInteraction
    [room]="room"
    [selectedId]="null"
    [zoom]="zoom"
    (interaction)="onInteraction($event)"
  ></canvas>`,
  standalone: true,
  imports: [CanvasInteractionDirective],
})
class TestHostComponent {
  room: Room = {
    width: 100,
    height: 100,
    widthMeters: 10,
    heightMeters: 10,
    tables: [],
    staticElements: [],
  };
  zoom = 1;
  event?: CanvasInteractionEvent;

  onInteraction(evt: CanvasInteractionEvent) {
    this.event = evt;
    if (evt.zoom) {
      this.zoom = evt.zoom;
    }
  }
}

describe('CanvasInteractionDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit zoom event on wheel with ctrlKey (trackpad pinch)', () => {
    const canvas = fixture.debugElement.query(By.css('canvas'))
      .nativeElement as HTMLCanvasElement;
    canvas.dispatchEvent(
      new WheelEvent('wheel', { deltaY: -100, ctrlKey: true }),
    );
    fixture.detectChanges();

    expect(host.event?.type).toBe(CanvasInteractionEventTypeEnum.ZOOM);
    expect(host.zoom).not.toBe(1);
  });

  it('should not emit zoom event on wheel without ctrlKey (regular mouse wheel)', () => {
    const canvas = fixture.debugElement.query(By.css('canvas'))
      .nativeElement as HTMLCanvasElement;
    canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
    fixture.detectChanges();

    expect(host.event?.type).not.toBe(CanvasInteractionEventTypeEnum.ZOOM);
    expect(host.zoom).toBe(1);
  });
});
