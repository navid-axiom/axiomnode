// @ts-nocheck
let alerts = [];

export function getAlerts() {
  return alerts;
}

export function addAlert(alert) {
  alerts.push(alert);
  return alert;
}
