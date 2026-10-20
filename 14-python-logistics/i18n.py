"""Console UI messages with Spanish and English catalogs."""
from __future__ import annotations

MESSAGES: dict[str, dict[str, str]] = {
    "es": {
        "app.title": "=== Logística (Python + Estructuras de Datos) ===",
        "menu.inventory": "1. Ver inventario",
        "menu.add_stock": "2. Agregar stock",
        "menu.route": "3. Ruta más corta entre hubs (Dijkstra)",
        "menu.reachable": "4. Hubs alcanzables (BFS)",
        "menu.add_shipment": "5. Registrar envío",
        "menu.next_shipment": "6. Procesar próximo envío (cola de prioridad)",
        "menu.list_shipments": "7. Listar envíos por prioridad (Merge Sort)",
        "menu.find_shipment": "8. Buscar envío por ID (búsqueda binaria)",
        "menu.language": "9. Cambiar idioma / Change language (ES/EN)",
        "menu.exit": "10. Salir",
        "prompt.option": "Opción",
        "prompt.product": "Producto",
        "prompt.quantity": "Cantidad",
        "prompt.origin": "Origen",
        "prompt.destination": "Destino",
        "prompt.hub": "Hub inicial",
        "prompt.shipment_id": "ID envío",
        "prompt.customer": "Cliente",
        "prompt.priority": "Prioridad",
        "msg.stock_updated": "Stock actualizado.",
        "msg.route": "Distancia: {km} km | Ruta: {route}",
        "msg.no_route": "Distancia: 0 km | Ruta: sin ruta",
        "msg.shipment_registered": "Envío registrado.",
        "msg.no_shipments": "Sin envíos pendientes.",
        "msg.not_found": "No encontrado.",
        "msg.invalid_option": "Opción no válida.",
        "msg.language_changed": "Idioma cambiado a español.",
        "msg.goodbye": "Hasta pronto.",
    },
    "en": {
        "app.title": "=== Logistics (Python + Data Structures) ===",
        "menu.inventory": "1. Show inventory",
        "menu.add_stock": "2. Add stock",
        "menu.route": "3. Shortest route between hubs (Dijkstra)",
        "menu.reachable": "4. Reachable hubs (BFS)",
        "menu.add_shipment": "5. Register shipment",
        "menu.next_shipment": "6. Process next shipment (priority queue)",
        "menu.list_shipments": "7. List shipments by priority (Merge Sort)",
        "menu.find_shipment": "8. Find shipment by ID (binary search)",
        "menu.language": "9. Change language (ES/EN)",
        "menu.exit": "10. Exit",
        "prompt.option": "Option",
        "prompt.product": "Product",
        "prompt.quantity": "Quantity",
        "prompt.origin": "Origin",
        "prompt.destination": "Destination",
        "prompt.hub": "Starting hub",
        "prompt.shipment_id": "Shipment ID",
        "prompt.customer": "Customer",
        "prompt.priority": "Priority",
        "msg.stock_updated": "Stock updated.",
        "msg.route": "Distance: {km} km | Route: {route}",
        "msg.no_route": "Distance: 0 km | Route: no route",
        "msg.shipment_registered": "Shipment registered.",
        "msg.no_shipments": "No pending shipments.",
        "msg.not_found": "Not found.",
        "msg.invalid_option": "Invalid option.",
        "msg.language_changed": "Language changed to English.",
        "msg.goodbye": "Goodbye.",
    },
}

_language = "es"


def set_language(value: str) -> None:
    """Sets the active UI language."""
    global _language
    _language = "en" if value.lower() == "en" else "es"


def get_language() -> str:
    """Returns the active UI language."""
    return _language


def toggle_language() -> str:
    """Switches between Spanish and English and returns the new language."""
    set_language("es" if get_language() == "en" else "en")
    return _language


def t(key: str, **kwargs) -> str:
    """Resolves a message key for the active language."""
    message = MESSAGES.get(_language, MESSAGES["es"]).get(key, key)
    return message.format(**kwargs) if kwargs else message
