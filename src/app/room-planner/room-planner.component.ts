import {
  Component,
  computed,
  effect,
  ElementRef,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { Room, RoomElement } from './models';

@Component({
  selector: 'app-room-planner',
  standalone: true,
  imports: [],
  templateUrl: './room-planner.component.html',
})
export class RoomPlannerComponent {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  readonly HANDLE_SIZE = 10;
  readonly GRID_SIZE = 20;

  // 📦 Reactive state
  readonly room = signal<Room>({
    width: 600,
    height: 400,
    tables: [],
    entrances: [],
    decorations: [],
    walls: [],
  });

  readonly selectedId = signal<string | null>(null);
  readonly importedJSON = signal('');

  readonly selectedElement = computed(() => {
    const selectedId = this.selectedId();
    if (!selectedId) return null;
    
    const room = this.room();
    // Check in each array for the selected element
    return room.tables.find((el) => el.id === selectedId) || 
           room.entrances.find((el) => el.id === selectedId) ||
           room.decorations?.find((el) => el.id === selectedId) ||
           room.walls?.find((el) => el.id === selectedId);
  });

  // 🧠 Redraw effect
  constructor() {
    effect(() => {
      const room = this.room();
      if (this.ctx) {
        this.redraw(room);
      }
    });
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.setupMouseEvents();
  }

  snap = (v: number) => Math.round(v / this.GRID_SIZE) * this.GRID_SIZE;

  addElement(type: 'rect' | 'circle') {
    const newEl: RoomElement = {
      id: crypto.randomUUID(),
      x: this.snap(100),
      y: this.snap(100),
      width: this.snap(100),
      height: this.snap(60),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      type,
    };
    this.room.update((r) => ({ ...r, tables: [...r.tables, newEl] }));
  }

  clearElements() {
    this.room.update((r) => ({ 
      ...r, 
      tables: [], 
      entrances: [], 
      decorations: [], 
      walls: [] 
    }));
    this.selectedId.set(null);
  }

  addEntrance() {
    const newEntrance: RoomElement = {
      id: crypto.randomUUID(),
      x: this.snap(50),
      y: this.snap(0),  // Place it at the top edge by default
      width: this.snap(80),
      height: this.snap(30),
      color: '#808080', // Grey color
      type: 'rect',
      label: 'Entrance'
    };
    this.room.update((r) => ({ ...r, entrances: [...r.entrances, newEntrance] }));
  }

  updateElement(id: string, update: Partial<RoomElement>) {
    this.room.update((r) => {
      // Find which array the element belongs to
      const tableEl = r.tables.find(el => el.id === id);
      const entranceEl = r.entrances.find(el => el.id === id);
      const decorationEl = r.decorations?.find(el => el.id === id);
      const wallEl = r.walls?.find(el => el.id === id);
      
      if (tableEl) {
        return {
          ...r,
          tables: r.tables.map((el) => el.id === id ? { ...el, ...update } : el),
        };
      } else if (entranceEl) {
        return {
          ...r,
          entrances: r.entrances.map((el) => el.id === id ? { ...el, ...update } : el),
        };
      } else if (decorationEl) {
        return {
          ...r,
          decorations: r.decorations.map((el) => el.id === id ? { ...el, ...update } : el),
        };
      } else if (wallEl) {
        return {
          ...r,
          walls: r.walls.map((el) => el.id === id ? { ...el, ...update } : el),
        };
      }
      return r;
    });
  }

  redraw(room: Room) {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = room.width;
    canvas.height = room.height;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw tables
    for (const el of room.tables) {
      this.drawElement(el, el.id === this.selectedId());
    }

    // Draw entrances with labels
    for (const entrance of room.entrances) {
      this.drawElement(entrance, entrance.id === this.selectedId(), true);
    }
    
    // Draw decorations if needed
    for (const decoration of room.decorations || []) {
      this.drawElement(decoration, decoration.id === this.selectedId());
    }
    
    // Draw walls if needed
    for (const wall of room.walls || []) {
      this.drawElement(wall, wall.id === this.selectedId());
    }
  }
  
  drawElement(el: RoomElement, isSelected: boolean, drawLabel: boolean = false) {
    this.ctx.fillStyle = el.color || 'gray';
    
    if (el.type === 'rect') {
      // Draw rectangle
      this.ctx.fillRect(el.x, el.y, el.width, el.height);
      
      // Draw selection outline if selected
      if (isSelected) {
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(el.x, el.y, el.width, el.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(
          el.x + el.width - this.HANDLE_SIZE,
          el.y + el.height - this.HANDLE_SIZE,
          this.HANDLE_SIZE,
          this.HANDLE_SIZE
        );
      }
      
      // Draw label if needed
      if (drawLabel && el.label) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(el.label, el.x + el.width / 2, el.y + el.height / 2);
      }
    } else if (el.type === 'circle') {
      // Draw circle
      const radius = Math.min(el.width, el.height) / 2;
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;
      
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      if (isSelected) {
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(
          el.x + el.width - this.HANDLE_SIZE,
          el.y + el.height - this.HANDLE_SIZE,
          this.HANDLE_SIZE,
          this.HANDLE_SIZE
        );
      }
      
      // Draw label if needed
      if (drawLabel && el.label) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(el.label, centerX, centerY);
      }
    }
  }

  // 🖱 Mouse Events
  setupMouseEvents() {
    const canvas = this.canvasRef.nativeElement;
    let resizing = false;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    canvas.addEventListener('mousedown', (e) => {
      const el = this.findElementAt(e.offsetX, e.offsetY);
      if (el) {
        this.selectedId.set(el.id);
        if (this.isOverHandle(e.offsetX, e.offsetY, el)) {
          resizing = true;
        } else {
          dragging = true;
          offsetX = e.offsetX - el.x;
          offsetY = e.offsetY - el.y;
        }
      } else {
        this.selectedId.set(null);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      const el = this.selectedElement();
      if (!el) return;

      if (resizing) {
        this.updateElement(el.id, {
          width: this.snap(e.offsetX - el.x),
          height: this.snap(e.offsetY - el.y),
        });
      } else if (dragging) {
        this.updateElement(el.id, {
          x: this.snap(e.offsetX - offsetX),
          y: this.snap(e.offsetY - offsetY),
        });
      }
    });

    canvas.addEventListener('mouseup', () => {
      resizing = false;
      dragging = false;
    });
  }

  // 🧠 Hit Test Helpers
  findElementAt(x: number, y: number): RoomElement | null {
    const room = this.room();
    // Combine all element types into a single array for hit testing
    // Reverse to check elements drawn on top (later in the array) first
    const allElements = [
      ...(room.walls || []),
      ...(room.decorations || []),
      ...room.tables,
      ...room.entrances
    ].reverse();
    
    return allElements.find((el) => {
        if (el.type === 'rect') {
          return (
            x >= el.x &&
            x <= el.x + el.width &&
            y >= el.y &&
            y <= el.y + el.height
          );
        } else if (el.type === 'circle') {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          const dx = (x - cx) / (el.width / 2);
          const dy = (y - cy) / (el.height / 2);
          return dx * dx + dy * dy <= 1;
        }
        return false;
      }) ?? null;
  }

  isOverHandle(x: number, y: number, el: RoomElement): boolean {
    const handleX = el.x + el.width - this.HANDLE_SIZE;
    const handleY = el.y + el.height - this.HANDLE_SIZE;
    return (
      x >= handleX &&
      x <= handleX + this.HANDLE_SIZE &&
      y >= handleY &&
      y <= handleY + this.HANDLE_SIZE
    );
  }

  exportJSON(): string {
    return JSON.stringify(this.room(), null, 2);
  }

  importFromJSON() {
    try {
      const parsed = JSON.parse(this.importedJSON());
      if (parsed.width && parsed.height && Array.isArray(parsed.elements)) {
        this.room.set(parsed);
        this.selectedId.set(null);
      } else {
        alert('Invalid format');
      }
    } catch {
      alert('Invalid JSON');
    }
  }

  updateRoomWidth(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.room.update((r) => ({ ...r, width: value }));
  }

  updateRoomHeight(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.room.update((r) => ({ ...r, height: value }));
  }
}
