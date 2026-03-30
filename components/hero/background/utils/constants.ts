export const FPS = 50
export const INITIAL_VEL_MULIPLIER = 120
export const BASE_VELOCITY_X_RANGE = 1
export const BASE_VELOCITY_Y_RANGE = 1
export const MIN_SIZE_POINTS = 5
export const MAX_SIZE_POINTS = 15
export const POINTS_BOUNCE = true
export const HOVER_VELOCITY_MULTIPLIER = 1.5
// MAX_HOVER_VELOCITY must always be a multiple of HOVER_VELOCITY_MULTIPLIER so a point can return to its original velocity
export const MAX_HOVER_VELOCITY = HOVER_VELOCITY_MULTIPLIER * 7

export const POINTS_DESKTOP = 30
export const POINTS_MOBILE = 10

export const POINT_ALPHA = 0.6
// Threshold for drawing connecting lines between points
export const LINE_DISTANCE_THRESHOLD = 100
export const LINE_DISTANCE_SQ = LINE_DISTANCE_THRESHOLD * LINE_DISTANCE_THRESHOLD
// Distance at which line opacity fades to zero
export const LINE_MAX_DISTANCE = 170

export const HOVER_RADIUS = 100
export const HOVER_THROTTLE_MS = 50
export const HOVER_RESET_DELAY_MS = 1000

export const POINTS_HOVER_COLOR = "#989"
