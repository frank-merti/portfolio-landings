"""Console UI for the logistics application."""
from __future__ import annotations
from entities import Shipment
from i18n import t, toggle_language
from manager import LogisticsManager


def seed(manager: LogisticsManager) -> None:
    for hub in ["CDMX", "Puebla", "Toluca", "Querétaro", "Guadalajara"]:
        manager.add_hub(hub)

    manager.add_route("CDMX", "Puebla", 130)
    manager.add_route("CDMX", "Toluca", 65)
    manager.add_route("Toluca", "Querétaro", 150)
    manager.add_route("Puebla", "Querétaro", 190)
    manager.add_route("Querétaro", "Guadalajara", 280)

    manager.add_stock("Laptop", 10)
    manager.add_stock("Mouse", 50)

    manager.register_shipment(Shipment("S001", "Ana", "Guadalajara", 3))
    manager.register_shipment(Shipment("S002", "Carlos", "Puebla", 5))
    manager.register_shipment(Shipment("S003", "Marina", "Toluca", 1))


def print_menu() -> None:
    print(t("app.title"))
    print(t("menu.inventory"))
    print(t("menu.add_stock"))
    print(t("menu.route"))
    print(t("menu.reachable"))
    print(t("menu.add_shipment"))
    print(t("menu.next_shipment"))
    print(t("menu.list_shipments"))
    print(t("menu.find_shipment"))
    print(t("menu.language"))
    print(t("menu.exit"))


def main() -> None:
    manager = LogisticsManager()
    seed(manager)

    while True:
        print_menu()
        option = input(t("prompt.option") + ": ").strip()

        if option == "1":
            print(manager.inventory)

        elif option == "2":
            product = input(t("prompt.product") + ": ")
            quantity = int(input(t("prompt.quantity") + ": "))
            manager.add_stock(product, quantity)
            print(t("msg.stock_updated"))

        elif option == "3":
            origin = input(t("prompt.origin") + ": ")
            destination = input(t("prompt.destination") + ": ")
            km, route = manager.shortest_route(origin, destination)
            if route:
                print(t("msg.route", km=km, route=" -> ".join(route)))
            else:
                print(t("msg.no_route"))

        elif option == "4":
            hub = input(t("prompt.hub") + ": ")
            print(manager.reachable_hubs(hub))

        elif option == "5":
            shipment_id = input(t("prompt.shipment_id") + ": ")
            customer = input(t("prompt.customer") + ": ")
            destination = input(t("prompt.destination") + ": ")
            priority = int(input(t("prompt.priority") + ": "))
            manager.register_shipment(Shipment(shipment_id, customer, destination, priority))
            print(t("msg.shipment_registered"))

        elif option == "6":
            shipment = manager.next_shipment()
            print(shipment if shipment else t("msg.no_shipments"))

        elif option == "7":
            for shipment in manager.sorted_shipments(key=lambda item: -item.priority):
                print(shipment)

        elif option == "8":
            shipment_id = input(t("prompt.shipment_id") + ": ")
            found = manager.find_shipment(shipment_id)
            print(found if found else t("msg.not_found"))

        elif option == "9":
            toggle_language()
            print(t("msg.language_changed"))

        elif option == "10":
            print(t("msg.goodbye"))
            break

        else:
            print(t("msg.invalid_option"))


if __name__ == "__main__":
    main()
