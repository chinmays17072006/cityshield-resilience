# CityShield Resilience

A static, interactive prototype for an urban resilience command center. It includes a welcome page, role-based demo views, an interactive map, incident reporting, a response-time analytics dashboard, and resilience simulations.

## Run it

1. Open `index.html` in a modern browser, or serve this folder locally, for example:
   ```bash
   python3 -m http.server 8000
   ```
2. Visit `http://localhost:8000`.
3. Allow browser location access if you want the map to center on your current location. Location is optional; the prototype has a Mangalore demo fallback.

## Notes

- An internet connection is required for map tiles, live weather/AQI lookups, and external CDN libraries.
- The map uses public Esri and OpenStreetMap data; third-party service availability and terms apply.
- Incident and operations records in this prototype are synthetic demo data. This is a front-end prototype, not a live emergency dispatch system.
- Voice alerts are disabled.
