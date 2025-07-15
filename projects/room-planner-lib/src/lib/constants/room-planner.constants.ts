/**
 * Shared constants for the room planner module
 */
export const ROOM_PLANNER_CONSTANTS = {
  // Pixels per meter conversion factor (100 pixels = 1 meter)
  PIXELS_PER_METER: 100,

  // Default width of the room in meters
  ROOM_WIDTH_METERS: 6,

  // Default height of the room in meters
  ROOM_HEIGHT_METERS: 4,

  // Default width of the room in pixels (calculated from meters)
  ROOM_WIDTH: 600,

  // Default height of the room in pixels (calculated from meters)
  ROOM_HEIGHT: 400,

  // Default color for room borders
  ROOM_BORDER_COLOR: '#999',

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
  ELEMENT_COLOR_SELECTED: '#aaa',

  // Default width of room elements
  ELEMENT_WIDTH: 100,

  // Default height of room elements
  ELEMENT_HEIGHT: 60,

  // Default position on the x-axis for new elements
  ELEMENT_X_POSITION: 100,

  // Default position on the y-axis for new elements
  ELEMENT_Y_POSITION: 100,

  // Size of resize handles for room elements
  ELEMENT_HANDLE_SIZE: 24,

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
