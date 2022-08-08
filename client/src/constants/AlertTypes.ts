export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  STATUS: 'status',
}

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES]
