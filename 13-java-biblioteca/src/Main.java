import java.util.List;
import java.util.Map;
import java.util.Scanner;

/**
 * Clase Main: interfaz de usuario (menú de consola) de la biblioteca.
 *
 * Aquí NO hay lógica de negocio: Main solo pide datos, llama a los métodos
 * de {@link LibraryService} y muestra resultados. Esta separación permite
 * que la lógica se pueda reutilizar (por ejemplo, en una API web o en tests).
 */
public class Main {

    public static void main(String[] args) {
        LibraryService library = new LibraryService();
        library.seed(); // datos de ejemplo para poder probar rápido

        Scanner sc = new Scanner(System.in);
        boolean running = true;

        // Bucle principal: se repite hasta que el usuario elige "Salir"
        while (running) {
            printMenu();
            String option = readLine(sc, "Opción");

            // switch clásico: cada opción ejecuta la acción correspondiente
            switch (option) {
                case "1" -> handleAddBook(sc, library);
                case "2" -> handleAddUser(sc, library);
                case "3" -> handleSearchIsbn(sc, library);
                case "4" -> handleSearchAuthor(sc, library);
                case "5" -> { library.sortByTitle(); System.out.println("Catálogo ordenado por título."); }
                case "6" -> { library.sortByAuthor(); System.out.println("Catálogo ordenado por autor."); }
                case "7" -> handleBorrow(sc, library);
                case "8" -> handleReturn(sc, library);
                case "9" -> System.out.println(library.undoLast() ? "Acción deshecha." : "Nada que deshacer.");
                case "10" -> library.getBooks().forEach(System.out::println);
                case "11" -> {
                    // Se recorren los valores del Map (no las claves) para mostrar los socios
                    for (Map.Entry<String, User> entry : library.getUsers().entrySet()) {
                        System.out.println(entry.getValue());
                    }
                }
                case "12" -> running = false;
                default -> System.out.println("Opción no válida.");
            }
            System.out.println();
        }
        System.out.println("Hasta pronto.");
    }

    /** Imprime el menú de opciones de la aplicación. */
    private static void printMenu() {
        System.out.println("=== Biblioteca (Java + Data Structures) ===");
        System.out.println("1. Registrar libro");
        System.out.println("2. Registrar usuario");
        System.out.println("3. Buscar libro por ISBN (búsqueda binaria)");
        System.out.println("4. Buscar libros por autor (búsqueda lineal)");
        System.out.println("5. Ordenar catálogo por título (Merge Sort)");
        System.out.println("6. Ordenar catálogo por autor (Merge Sort)");
        System.out.println("7. Prestar libro");
        System.out.println("8. Devolver libro");
        System.out.println("9. Deshacer último préstamo");
        System.out.println("10. Listar libros");
        System.out.println("11. Listar usuarios");
        System.out.println("12. Salir");
    }

    /** Lee una línea del teclado y la devuelve sin espacios sobrantes. */
    private static String readLine(Scanner sc, String label) {
        System.out.print(label + ": ");
        return sc.nextLine().trim();
    }

    /** Opción 1: alta de libros (ArrayList + HashMap). */
    private static void handleAddBook(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        String title = readLine(sc, "Título");
        String author = readLine(sc, "Autor");
        library.addBook(new Book(isbn, title, author));
        System.out.println("Libro registrado (HashMap + ArrayList).");
    }

    /** Opción 2: alta de socios (HashMap). */
    private static void handleAddUser(Scanner sc, LibraryService library) {
        String id = readLine(sc, "ID");
        String name = readLine(sc, "Nombre");
        library.addUser(new User(id, name));
        System.out.println("Usuario registrado (HashMap).");
    }

    /** Opción 3: búsqueda binaria por ISBN. */
    private static void handleSearchIsbn(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        Book book = library.binarySearchByIsbn(isbn);
        System.out.println(book == null ? "No encontrado." : book);
    }

    /** Opción 4: búsqueda lineal por autor. */
    private static void handleSearchAuthor(Scanner sc, LibraryService library) {
        String author = readLine(sc, "Autor");
        List<Book> result = library.searchByAuthor(author);
        if (result.isEmpty()) {
            System.out.println("Sin resultados.");
        } else {
            result.forEach(System.out::println);
        }
    }

    /** Opción 7: préstamo de libros (Queue + pila de deshacer). */
    private static void handleBorrow(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        String userId = readLine(sc, "ID usuario");
        String due = readLine(sc, "Fecha vencimiento");
        boolean ok = library.borrowBook(isbn, userId, due);
        System.out.println(ok
                ? "Préstamo registrado (Queue + Stack para undo)."
                : "No fue posible prestar (libro/usuario no existe o ya prestado).");
    }

    /** Opción 8: devolución de libros. */
    private static void handleReturn(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        System.out.println(library.returnBook(isbn) ? "Libro devuelto." : "No se pudo devolver.");
    }
}
