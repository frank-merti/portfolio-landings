# NovaClinic · Medical Clinic Landing

[![Live demo](https://img.shields.io/badge/Live%20demo-0d9488?style=for-the-badge)](https://frank-merti.github.io/portfolio-landings/12-clinic/)
[![License: MIT](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)](LICENSE)

Medical clinic landing: services, doctor profiles, appointment booking and ES/EN switch.

**Landing de clínica médica: servicios, doctores, agenda de citas y cambio de idioma ES/EN.**

![Vista previa del proyecto](docs/screenshot.png)

---

## ES

### Funcionalidad
- Hero claro con métricas (especialidades, doctores, satisfacción).
- Cuatro servicios (medicina general, cardiología, laboratorio, bienestar).
- Perfiles de doctores con especialidad.
- Formulario de cita con fecha y especialidad, con confirmación.
- Conmutador ES/EN con persistencia en `localStorage`.

### Stack
HTML5 semántico · Tailwind CSS (CDN) · JavaScript vanilla · CSS Grid

### Ejecutar
```bash
cd 12-clinic
npx serve 12-clinic
```

### Qué aprendí
- En sector salud conviene usar fondos claros y contrastes suaves: comunica calma y confianza.
- Mostrar especialidad y nombre del profesional tiene más peso que el nombre del centro.
- Un formulario de cita con `date` y `select` nativos evita código extra y mejora la usabilidad móvil.

## EN

### Features
- Light hero with metrics (specialties, doctors, satisfaction).
- Four services (general medicine, cardiology, lab, wellness).
- Doctor profiles with specialty.
- Appointment form with date and specialty, plus confirmation state.
- ES/EN switch persisted in `localStorage`.

### Stack
Semantic HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · CSS Grid

### Run
```bash
cd 12-clinic
npx serve 12-clinic
```

### What I learned
- Healthcare needs light backgrounds and soft contrast: it communicates calm and trust.
- Showing the professional's specialty and name carries more weight than the clinic name.
- Native `date` and `select` controls remove custom code and improve mobile usability.

## Licencia
[MIT](LICENSE) © 2026 Francisco Merti
