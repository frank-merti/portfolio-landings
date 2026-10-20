import java.util.HashMap;
import java.util.Map;

/** Console UI messages with Spanish and English catalogs. */
public final class Messages {

    private static final Map<String, String> ES = new HashMap<>();
    private static final Map<String, String> EN = new HashMap<>();

    private static String language = "es";

    static {
        ES.put("app.title", "=== Biblioteca (Java + Estructuras de Datos) ===");
        ES.put("menu.add_book", "1. Registrar libro");
        ES.put("menu.add_user", "2. Registrar usuario");
        ES.put("menu.search_isbn", "3. Buscar libro por ISBN (búsqueda binaria)");
        ES.put("menu.search_author", "4. Buscar libros por autor (búsqueda lineal)");
        ES.put("menu.sort_title", "5. Ordenar catálogo por título (Merge Sort)");
        ES.put("menu.sort_author", "6. Ordenar catálogo por autor (Merge Sort)");
        ES.put("menu.borrow", "7. Prestar libro");
        ES.put("menu.return", "8. Devolver libro");
        ES.put("menu.undo", "9. Deshacer última acción");
        ES.put("menu.list_books", "10. Listar libros");
        ES.put("menu.list_users", "11. Listar usuarios");
        ES.put("menu.language", "12. Cambiar idioma / Change language (ES/EN)");
        ES.put("menu.exit", "13. Salir");
        ES.put("prompt.option", "Opción");
        ES.put("prompt.isbn", "ISBN");
        ES.put("prompt.title", "Título");
        ES.put("prompt.author", "Autor");
        ES.put("prompt.id", "ID");
        ES.put("prompt.name", "Nombre");
        ES.put("prompt.user_id", "ID usuario");
        ES.put("prompt.due_date", "Fecha de vencimiento");
        ES.put("msg.book_added", "Libro registrado.");
        ES.put("msg.user_added", "Usuario registrado.");
        ES.put("msg.not_found", "No encontrado.");
        ES.put("msg.no_results", "Sin resultados.");
        ES.put("msg.sorted_title", "Catálogo ordenado por título.");
        ES.put("msg.sorted_author", "Catálogo ordenado por autor.");
        ES.put("msg.borrow_ok", "Préstamo registrado.");
        ES.put("msg.borrow_error", "No fue posible prestar: libro o usuario inexistente, o libro prestado.");
        ES.put("msg.return_ok", "Libro devuelto.");
        ES.put("msg.return_error", "No se pudo devolver el libro.");
        ES.put("msg.undone", "Acción deshecha.");
        ES.put("msg.nothing_to_undo", "No hay acciones que deshacer.");
        ES.put("msg.invalid_option", "Opción no válida.");
        ES.put("msg.language_changed", "Idioma cambiado a español.");
        ES.put("msg.goodbye", "Hasta pronto.");

        EN.put("app.title", "=== Library (Java + Data Structures) ===");
        EN.put("menu.add_book", "1. Register book");
        EN.put("menu.add_user", "2. Register user");
        EN.put("menu.search_isbn", "3. Search book by ISBN (binary search)");
        EN.put("menu.search_author", "4. Search books by author (linear search)");
        EN.put("menu.sort_title", "5. Sort catalog by title (Merge Sort)");
        EN.put("menu.sort_author", "6. Sort catalog by author (Merge Sort)");
        EN.put("menu.borrow", "7. Borrow book");
        EN.put("menu.return", "8. Return book");
        EN.put("menu.undo", "9. Undo last action");
        EN.put("menu.list_books", "10. List books");
        EN.put("menu.list_users", "11. List users");
        EN.put("menu.language", "12. Change language (ES/EN)");
        EN.put("menu.exit", "13. Exit");
        EN.put("prompt.option", "Option");
        EN.put("prompt.isbn", "ISBN");
        EN.put("prompt.title", "Title");
        EN.put("prompt.author", "Author");
        EN.put("prompt.id", "ID");
        EN.put("prompt.name", "Name");
        EN.put("prompt.user_id", "User ID");
        EN.put("prompt.due_date", "Due date");
        EN.put("msg.book_added", "Book registered.");
        EN.put("msg.user_added", "User registered.");
        EN.put("msg.not_found", "Not found.");
        EN.put("msg.no_results", "No results.");
        EN.put("msg.sorted_title", "Catalog sorted by title.");
        EN.put("msg.sorted_author", "Catalog sorted by author.");
        EN.put("msg.borrow_ok", "Loan registered.");
        EN.put("msg.borrow_error", "Cannot borrow: book or user not found, or book already on loan.");
        EN.put("msg.return_ok", "Book returned.");
        EN.put("msg.return_error", "The book could not be returned.");
        EN.put("msg.undone", "Action undone.");
        EN.put("msg.nothing_to_undo", "Nothing to undo.");
        EN.put("msg.invalid_option", "Invalid option.");
        EN.put("msg.language_changed", "Language changed to English.");
        EN.put("msg.goodbye", "Goodbye.");
    }

    private Messages() {
    }

    /** Switches the UI language. */
    public static void setLanguage(String value) {
        language = "en".equalsIgnoreCase(value) ? "en" : "es";
    }

    /** Returns the current UI language. */
    public static String getLanguage() {
        return language;
    }

    /** Resolves a message key for the active language. */
    public static String t(String key) {
        Map<String, String> source = "en".equals(language) ? EN : ES;
        return source.getOrDefault(key, key);
    }
}
