import java.util.List;
import java.util.Map;
import java.util.Scanner;

/**
 * CLI demo entry point. Shows a menu-driven interface.
 */
public class Main {
    public static void main(String[] args) {
        LibraryService library = new LibraryService();
        library.seed();

        Scanner sc = new Scanner(System.in);
        boolean running = true;
        while (running) {
            printMenu();
            String option = readLine(sc, "Opción");
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
                case "11" -> library.getUsers().values().forEach(System.out::println);
                case "12" -> running = false;
                default -> System.out.println("Opción no válida.");
            }
            System.out.println();
        }
        System.out.println("Hasta pronto.");
    }

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

    private static String readLine(Scanner sc, String label) {
        System.out.print(label + ": ");
        return sc.nextLine().trim();
    }

    private static void handleAddBook(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        String title = readLine(sc, "Título");
        String author = readLine(sc, "Autor");
        library.addBook(new Book(isbn, title, author));
        System.out.println("Libro registrado (HashMap + ArrayList).");
    }

    private static void handleAddUser(Scanner sc, LibraryService library) {
        String id = readLine(sc, "ID");
        String name = readLine(sc, "Nombre");
        library.addUser(new User(id, name));
        System.out.println("Usuario registrado (HashMap).");
    }

    private static void handleSearchIsbn(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        Book book = library.binarySearchByIsbn(isbn);
        System.out.println(book == null ? "No encontrado." : book);
    }

    private static void handleSearchAuthor(Scanner sc, LibraryService library) {
        String author = readLine(sc, "Autor");
        List<Book> result = library.searchByAuthor(author);
        if (result.isEmpty()) System.out.println("Sin resultados.");
        else result.forEach(System.out::println);
    }

    private static void handleBorrow(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        String userId = readLine(sc, "ID usuario");
        String due = readLine(sc, "Fecha vencimiento");
        System.out.println(library.borrowBook(isbn, userId, due)
                ? "Préstamo registrado (Queue + Stack para undo)."
                : "No fue posible prestar (libro/ususario no existe o ya prestado).");
    }

    private static void handleReturn(Scanner sc, LibraryService library) {
        String isbn = readLine(sc, "ISBN");
        System.out.println(library.returnBook(isbn) ? "Libro devuelto." : "No se pudo devolver.");
    }
}
