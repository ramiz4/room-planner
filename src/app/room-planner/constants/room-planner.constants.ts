/**
 * Shared constants for the room planner module
 */
export const ROOM_PLANNER_CONSTANTS = {
  // Default width of the room
  ROOM_WIDTH: 600,

  // Default height of the room
  ROOM_HEIGHT: 400,

  // Default color for room borders
  ROOM_BORDER_COLOR: '#000000',

  // Default width of room borders
  ROOM_BORDER_WIDTH: 2,

  // Default color for grid lines
  ROOM_GRID_COLOR: '#e5e7eb',

  // Default width of grid lines
  ROOM_GRID_WIDTH: 1,

  // Default size of the grid for snapping elements
  ROOM_GRID_SIZE: 10,

  // Default color for room elements
  ELEMENT_COLOR: '#cccccc',

  // Default color for selected room elements
  ELEMENT_COLOR_SELECTED: '#ffcc00',

  // Default width of room elements
  ELEMENT_WIDTH: 100,

  // Default height of room elements
  ELEMENT_HEIGHT: 60,

  // Default position on the x-axis for new elements
  ELEMENT_X_POSITION: 100,

  // Default position on the y-axis for new elements
  ELEMENT_Y_POSITION: 100,

  // Size of resize handles for room elements
  ELEMENT_HANDLE_SIZE: 16,

  // Element shadow visibility
  ELEMENT_SHADOW_VISIBLE: false,

  // Default shadow color for room elements
  ELEMENT_SHADOW_COLOR: 'rgba(0, 0, 0, 0.2)',

  // Default shadow blur for room elements
  ELEMENT_SHADOW_BLUR: 4,

  // Default shadow offset on the x-axis for room elements
  ELEMENT_SHADOW_OFFSET_X: 2,

  // Default shadow offset on the y-axis for room elements
  ELEMENT_SHADOW_OFFSET_Y: 2,
} as const;
