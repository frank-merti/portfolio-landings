namespace Algorithms.Cli;

public static class Messages
{
    private static readonly Dictionary<string, string> Spanish = new()
    {
        ["app.title"] = "=== Algoritmos y estructuras de datos (C# / .NET) ===",
        ["menu.sort"] = "1. Ordenar tareas (Merge Sort / Quick Sort)",
        ["menu.search"] = "2. Buscar por prioridad (búsqueda binaria)",
        ["menu.graph"] = "3. Ruta más corta entre ciudades (Dijkstra)",
        ["menu.bfs"] = "4. Ciudades alcanzables (BFS)",
        ["menu.lru"] = "5. Caché LRU (OrderedDictionary + LinkedList)",
        ["menu.language"] = "6. Cambiar idioma / Change language (ES/EN)",
        ["menu.exit"] = "7. Salir",
        ["prompt.option"] = "Opción",
        ["prompt.priority"] = "Prioridad",
        ["prompt.city"] = "Ciudad",
        ["msg.sorted"] = "Tareas ordenadas por prioridad (estable):",
        ["msg.sorted_unstable"] = "Tareas ordenadas por prioridad (Quick Sort):",
        ["msg.found"] = "Encontrada la tarea con prioridad {0}.",
        ["msg.not_found"] = "No existe ninguna tarea con esa prioridad.",
        ["msg.route"] = "Distancia mínima: {0} km | Ruta: {1}",
        ["msg.no_route"] = "No hay ruta entre esas ciudades.",
        ["msg.reachable"] = "Ciudades alcanzables: {0}",
        ["msg.lru"] = "Claves en orden de uso (primero = más reciente): {0}",
        ["msg.invalid_option"] = "Opción no válida.",
        ["msg.language_changed"] = "Idioma cambiado a español.",
        ["msg.goodbye"] = "Hasta pronto."
    };

    private static readonly Dictionary<string, string> English = new()
    {
        ["app.title"] = "=== Algorithms and data structures (C# / .NET) ===",
        ["menu.sort"] = "1. Sort tasks (Merge Sort / Quick Sort)",
        ["menu.search"] = "2. Search by priority (binary search)",
        ["menu.graph"] = "3. Shortest route between cities (Dijkstra)",
        ["menu.bfs"] = "4. Reachable cities (BFS)",
        ["menu.lru"] = "5. LRU cache (Dictionary + LinkedList)",
        ["menu.language"] = "6. Change language (ES/EN)",
        ["menu.exit"] = "7. Exit",
        ["prompt.option"] = "Option",
        ["prompt.priority"] = "Priority",
        ["prompt.city"] = "City",
        ["msg.sorted"] = "Tasks sorted by priority (stable):",
        ["msg.sorted_unstable"] = "Tasks sorted by priority (Quick Sort):",
        ["msg.found"] = "Found the task with priority {0}.",
        ["msg.not_found"] = "No task found with that priority.",
        ["msg.route"] = "Shortest distance: {0} km | Route: {1}",
        ["msg.no_route"] = "There is no route between those cities.",
        ["msg.reachable"] = "Reachable cities: {0}",
        ["msg.lru"] = "Keys in usage order (first = most recent): {0}",
        ["msg.invalid_option"] = "Invalid option.",
        ["msg.language_changed"] = "Language changed to English.",
        ["msg.goodbye"] = "Goodbye."
    };

    private static string _language = "es";

    public static string Language => _language;

    public static void SetLanguage(string language) => _language = language == "en" ? "en" : "es";

    public static void ToggleLanguage() => _language = _language == "es" ? "en" : "es";

    public static string T(string key)
    {
        var catalog = _language == "en" ? English : Spanish;
        return catalog.TryGetValue(key, out var value) ? value : key;
    }
}
