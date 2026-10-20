# DevConf 2026 · Conference Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-22d3ee?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/06-evento/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Tech conference landing: speakers, agenda by slot, ticket tiers and venue, with ES/EN switch.

**Landing de conferencia tech: speakers, agenda por horarios, tipos de boleto y sede, con cambio ES/EN.**

---

## ES

### Funcionalidad
- Hero con degradado y métricas del evento (speakers, tracks, workshops, asistentes).
- Grid de speakers con rol y especialidad.
- Agenda por bloques horarios.
- Tres tipos de boleto (estudiante, profesional, empresa) con opción recomendada.
- Información de sede y fecha.
- Conmutador ES/EN con persistencia en `localStorage`.

### Stack
HTML5 semántico · Tailwind CSS (CDN) · JavaScript vanilla · CSS Grid

### Ejecutar
```bash
cd 06-evento
npx serve 06-evento
```

### Qué aprendí
- Una agenda por bloques horarios es más escaneable que una tabla con columnas por track.
- Marcar visualmente la opción "recomendada" incrementa la conversión sin cambiar el layout.
- Los degradados con texto sobre imagen requieren `text-gradient` + buen contraste para mantener legibilidad.

## EN

### Features
- Hero with gradient and event metrics (speakers, tracks, workshops, attendees).
- Speaker grid with role and expertise.
- Agenda organized by time slots.
- Three ticket tiers (student, professional, company) with a recommended option.
- Venue and date information.
- ES/EN switch persisted in `localStorage`.

### Stack
Semantic HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · CSS Grid

### Run
```bash
cd 06-evento
npx serve 06-evento
```

### What I learned
- A time-slot agenda is easier to scan than a table with one column per track.
- Visually marking the recommended tier improves conversion without changing the layout.
- Gradient headlines need solid contrast to stay readable.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
