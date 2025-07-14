import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CanvasInteractionDirective } from './canvas-interaction.directive';
import {
  CanvasInteractionEvent,
  CanvasInteractionEventTypeEnum,
} from '../interfaces/canvas-interactio-event.interface';
import { Room } from '../interfaces/room.interface';
import {
  ElementTypeEnum,
  RoomElement,
} from '../interfaces/room-element.interface';

@Component({
  template: `<canvas
    appCanvasInteraction
    [room]="room"
    [selectedId]="selectedId"
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
  selectedId: string | null = null;
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
      new WheelEvent('wheel', { deltaY: -100, ctrlKey: true })
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

  it('should pinch zoom canvas when touches start outside selected element', () => {
    host.room.staticElements.push({
      id: 'el1',
      x: 10,
      y: 10,
      width: 30,
      height: 30,
      color: '#ccc',
      label: 'el',
      elementType: ElementTypeEnum.STATIC,
      shapeType: 'rect',
      zIndex: 1,
    } as RoomElement);
    host.selectedId = 'el1';
    fixture.detectChanges();

    const canvas = fixture.debugElement.query(By.css('canvas'))
      .nativeElement as HTMLCanvasElement;

    const t1Start = new Touch({
      identifier: 1,
      target: canvas,
      clientX: 80,
      clientY: 80,
    });
    const t2Start = new Touch({
      identifier: 2,
      target: canvas,
      clientX: 90,
      clientY: 90,
    });
    canvas.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [t1Start, t2Start],
        targetTouches: [t1Start, t2Start],
        changedTouches: [t1Start, t2Start],
      })
    );

    const t1Move = new Touch({
      identifier: 1,
      target: canvas,
      clientX: 70,
      clientY: 70,
    });
    const t2Move = new Touch({
      identifier: 2,
      target: canvas,
      clientX: 100,
      clientY: 100,
    });
    canvas.dispatchEvent(
      new TouchEvent('touchmove', {
        touches: [t1Move, t2Move],
        targetTouches: [t1Move, t2Move],
        changedTouches: [t1Move, t2Move],
      })
    );
    fixture.detectChanges();

    expect(host.event?.type).toBe(CanvasInteractionEventTypeEnum.ZOOM);
  });
});
