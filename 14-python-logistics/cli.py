"""Interfaz de usuario por consola (menú) de la app de logística.

Este módulo solo interactúa con el usuario y delega toda la lógica al
``LogisticsManager``. Separar UI y lógica facilita probarlas por separado.
"""
from __future__ import annotations

from manager import LogisticsManager
from entities import Shipment


def seed(manager: LogisticsManager) -> None:
    """Carga datos de ejemplo: hubs, rutas, inventario y envíos."""
    for hub in ["CDMX", "Puebla", "Toluca", "Querétaro", "Guadalajara"]:
        manager.add_hub(hub)

    # Rutas del grafo (origen, destino, kilómetros)
    manager.add_route("CDMX", "Puebla", 130)
    manager.add_route("CDMX", "Toluca", 65)
    manager.add_route("Toluca", "Querétaro", 150)
    manager.add_route("Puebla", "Querétaro", 190)
    manager.add_route("Querétaro", "Guadalajara", 280)

    # Inventario inicial
    manager.add_stock("Laptop", 10)
    manager.add_stock("Mouse", 50)

    # Envíos iniciales con distintas prioridades
    manager.register_shipment(Shipment("S001", "Ana", "Guadalajara", 3))
    manager.register_shipment(Shipment("S002", "Carlos", "Puebla", 5))
    manager.register_shipment(Shipment("S003", "Marina", "Toluca", 1))


def print_menu() -> None:
    """Imprime las opciones disponibles."""
    print("=== Logística (Python + Data Structures) ===")
    print("1. Ver inventario")
    print("2. Agregar stock")
    print("3. Ruta más corta entre hubs (Dijkstra)")
    print("4. Hubs alcanzables (BFS)")
    print("5. Registrar envío (Shipment)")
    print("6. Procesar próximo envío (Priority Queue)")
    print("7. Listar envíos ordenados por prioridad (Merge Sort)")
    print("8. Buscar envío por ID (Binary Search)")
    print("9. Salir")


def main() -> None:
    """Bucle principal del menú."""
    manager = LogisticsManager()
    seed(manager)

    while True:
        print_menu()
        option = input("Opción: ").strip()

        if option == "1":
            # Muestra el diccionario de inventario
            print(manager.inventory)

        elif option == "2":
            product = input("Producto: ")
            qty = int(input("Cantidad: "))
            manager.add_stock(product, qty)
            print("Stock actualizado.")

        elif option == "3":
            # Dijkstra: ruta más corta entre dos hubs
            start = input("Origen: ")
            end = input("Destino: ")
            km, path = manager.shortest_route(start, end)
            print(f"Distancia: {km} km | Ruta: {' -> '.join(path) if path else 'sin ruta'}")

        elif option == "4":
            # BFS: hubs que se pueden alcanzar desde el origen
            start = input("Hub inicial: ")
            print(manager.reachable_hubs(start))

        elif option == "5":
            # Alta de envíos (se encolan por prioridad)
            sid = input("ID envío: ")
            cust = input("Cliente: ")
            dest = input("Destino: ")
            prio = int(input("Prioridad: "))
            manager.register_shipment(Shipment(sid, cust, dest, prio))
            print("Envío registrado.")

        elif option == "6":
            # Se saca de la cola de prioridad el envío más urgente
            shipment = manager.next_shipment()
            print(shipment if shipment else "Sin envíos pendientes.")

        elif option == "7":
            # Merge Sort por prioridad descendente
            for s in manager.sorted_shipments(key=lambda s: -s.priority):
                print(s)

        elif option == "8":
            # Binary Search sobre una copia ordenada por id
            sid = input("ID envío: ")
            found = manager.find_shipment(sid)
            print(found if found else "No encontrado.")

        elif option == "9":
            print("Hasta pronto.")
            break

        else:
            print("Opción no válida.")


if __name__ == "__main__":
    main()
