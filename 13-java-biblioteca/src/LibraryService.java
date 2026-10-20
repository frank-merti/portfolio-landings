import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

/**
 * Clase LibraryService: concentra la lógica de la biblioteca.
 *
 * Es el "modelo" de la aplicación. La clase Main solo se encarga de la
 * interfaz de usuario (menú de consola), por lo que aquí se aplica el
 * principio de "Separation of Concerns" y el principio SOLID (una sola
 * responsabilidad por clase).
 *
 * ESTRUCTURAS DE DATOS UTILIZADAS
 *  - ArrayList&lt;Book&gt;          books        -> catálogo (permite ordenar)
 *  - HashMap&lt;String, Book&gt;     bookByIsbn   -> búsqueda O(1) por ISBN
 *  - HashMap&lt;String, User&gt;     users        -> socios registrados
 *  - Queue&lt;Loan&gt;                loanQueue    -> cola FIFO de préstamos
 *  - Deque&lt;String&gt;              undoStack    -> pila LIFO para deshacer
 *  - HashSet&lt;String&gt;            categories   -> categorías sin repetir
 *
 * ALGORITMOS IMPLEMENTADOS
 *  - Merge Sort por título y por autor  -> O(n log n) en todos los casos
 *  - Binary Search por ISBN              -> O(log n) (requiere lista ordenada)
 *  - Búsqueda lineal por autor          -> O(n)
 */
public class LibraryService {

    /* ===================== Atributos ===================== */

    /** Catálogo de libros. ArrayList porque se necesita ordenar y recorrer. */
    private final ArrayList<Book> books;

    /** Índice ISBN -> libro. HashMap para acceso O(1) sin recorrer la lista. */
    private final HashMap<String, Book> bookByIsbn;

    /** Socios registrados, indexados por su id. */
    private final HashMap<String, User> users;

    /** Cola de préstamos: el primero que entra es el primero que sale (FIFO). */
    private final Queue<Loan> loanQueue;

    /** Pila de acciones para "deshacer": la última acción es la primera en salir (LIFO). */
    private final Deque<String> undoStack;

    /** Conjunto de categorías: HashSet evita duplicados automáticamente. */
    private final Set<String> categories;

    /** Constructor: inicializa todas las estructuras vacías. */
    public LibraryService() {
        books = new ArrayList<>();
        bookByIsbn = new HashMap<>();
        users = new HashMap<>();
        loanQueue = new LinkedList<>();
        undoStack = new ArrayDeque<>();
        categories = new HashSet<>();
    }

    /* ===================== Datos de ejemplo ===================== */

    /**
     * Carga libros, socios y categorías de ejemplo para poder probar la
     * aplicación sin teclear datos.
     */
    public void seed() {
        addBook(new Book("978-1", "The Hobbit", "J.R.R. Tolkien"));
        addBook(new Book("978-2", "Clean Code", "Robert C. Martin"));
        addBook(new Book("978-3", "Effective Java", "Joshua Bloch"));
        addBook(new Book("978-4", "Design Patterns", "Erich Gamma"));
        addUser(new User("U1", "Ana"));
        addUser(new User("U2", "Carlos"));
        categories.add("Fiction");
        categories.add("Software");
    }

    /* ===================== Búsquedas O(1) con HashMap ===================== */

    /** Busca un libro por ISBN usando el HashMap: O(1). */
    public Book findBook(String isbn) { return bookByIsbn.get(isbn); }

    /** Busca un usuario por id usando el HashMap: O(1). */
    public User findUser(String id) { return users.get(id); }

    /**
     * Da de alta un libro: se agrega a la lista y al mapa índice.
     * Se apila la acción en la pila de "deshacer" (LIFO).
     */
    public void addBook(Book b) {
        books.add(b);
        bookByIsbn.put(b.getIsbn(), b);
        undoStack.push("ADD_BOOK:" + b.getIsbn());
    }

    /** Da de alta un socio en el HashMap de usuarios. */
    public void addUser(User u) { users.put(u.getId(), u); }

    /** Devuelve el catálogo completo. */
    public List<Book> getBooks() { return books; }

    /** Devuelve el mapa de socios. */
    public Map<String, User> getUsers() { return users; }

    /** Devuelve las categorías registradas. */
    public Set<String> getCategories() { return categories; }

    /** Devuelve la cola de préstamos. */
    public Queue<Loan> getLoanQueue() { return loanQueue; }

    /* ===================== Búsqueda lineal O(n) ===================== */

    /**
     * Búsqueda lineal por autor.
     * Recorre el catálogo completo comparando cada autor.
     * Complejidad: O(n) en tiempo y O(k) en memoria (k = coincidencias).
     */
    public List<Book> searchByAuthor(String author) {
        List<Book> result = new ArrayList<>();
        String needle = author.toLowerCase(); // normalizamos para no distinguir mayúsculas
        for (Book b : books) {
            if (b.getAuthor().toLowerCase().contains(needle)) {
                result.add(b);
            }
        }
        return result;
    }

    /* ===================== Búsqueda binaria O(log n) ===================== */

    /**
     * Búsqueda binaria por ISBN.
     *
     * 1) Se crea una copia del catálogo y se ordena por ISBN con Merge Sort
     *    (la búsqueda binaria exige que la lista esté ordenada).
     * 2) Se busca dividiendo el intervalo a la mitad en cada paso.
     *
     * Complejidad: O(log n) en la búsqueda + O(n log n) del ordenamiento previo.
     */
    public Book binarySearchByIsbn(String isbn) {
        // 1. Copia ordenada por ISBN (no se modifica el catálogo original)
        ArrayList<Book> sorted = new ArrayList<>(books);
        mergeSortByIsbn(sorted, 0, sorted.size() - 1);

        // 2. Búsqueda binaria: se reduce el rango a la mitad en cada iteración
        int lo = 0;
        int hi = sorted.size() - 1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1; // (lo + hi) / 2 sin riesgo de desbordamiento
            int cmp = sorted.get(mid).getIsbn().compareTo(isbn);
            if (cmp == 0) {
                return sorted.get(mid);   // ISBN encontrado
            } else if (cmp < 0) {
                lo = mid + 1;              // el ISBN buscado es mayor: buscamos a la derecha
            } else {
                hi = mid - 1;              // el ISBN buscado es menor: buscamos a la izquierda
            }
        }
        return null; // no existe
    }

    /* ===================== Merge Sort ===================== */

    /** Ordena el catálogo por título usando Merge Sort. */
    public void sortByTitle() { mergeSortByTitle(books, 0, books.size() - 1); }

    /** Ordena el catálogo por autor usando Merge Sort. */
    public void sortByAuthor() { mergeSortByAuthor(books, 0, books.size() - 1); }

    /**
     * Merge Sort por título.
     * Divide el arreglo en dos mitades, ordena cada una recursivamente y
     * las mezcla (merge) comparando los títulos.
     */
    private void mergeSortByTitle(List<Book> list, int left, int right) {
        if (left >= right) return; // caso base: un solo elemento ya está ordenado
        int mid = (left + right) / 2;
        mergeSortByTitle(list, left, mid);
        mergeSortByTitle(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getTitle().compareToIgnoreCase(b.getTitle()));
    }

    /** Merge Sort por autor (misma idea, comparando por autor). */
    private void mergeSortByAuthor(List<Book> list, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSortByAuthor(list, left, mid);
        mergeSortByAuthor(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getAuthor().compareToIgnoreCase(b.getAuthor()));
    }

    /** Merge Sort por ISBN (usado como paso previo a la búsqueda binaria). */
    private void mergeSortByIsbn(List<Book> list, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSortByIsbn(list, left, mid);
        mergeSortByIsbn(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getIsbn().compareTo(b.getIsbn()));
    }

    /** Interfaz funcional para comparar dos libros (evita repetir el merge). */
    @FunctionalInterface
    private interface BookComparator { int compare(Book a, Book b); }

    /**
     * Mezcla dos sublistas ya ordenadas en una sola lista ordenada.
     * Usa un arreglo auxiliar del tamaño exacto necesario (O(n) de memoria).
     */
    private void merge(List<Book> list, int left, int mid, int right, BookComparator cmp) {
        List<Book> tmp = new ArrayList<>(right - left + 1);
        int i = left;
        int j = mid + 1;

        // Se compara el primer elemento pendiente de cada mitad
        while (i <= mid && j <= right) {
            if (cmp.compare(list.get(i), list.get(j)) <= 0) {
                tmp.add(list.get(i++));
            } else {
                tmp.add(list.get(j++));
            }
        }
        // Se copian los elementos sobrantes de la mitad izquierda
        while (i <= mid) tmp.add(list.get(i++));
        // Se copian los elementos sobrantes de la mitad derecha
        while (j <= right) tmp.add(list.get(j++));

        // Se sobrescribe el rango original con el resultado ordenado
        for (int k = 0; k < tmp.size(); k++) {
            list.set(left + k, tmp.get(k));
        }
    }

    /* ===================== Préstamos, Queue y pila de "deshacer" ===================== */

    /**
     * Presta un libro a un usuario.
     * - El libro debe existir, el usuario debe existir y el libro estar disponible.
     * - El préstamo entra a la cola FIFO (loanQueue).
     * - La acción se apila en la pila LIFO (undoStack) para poder deshacerla.
     */
    public boolean borrowBook(String isbn, String userId, String dueDate) {
        Book book = findBook(isbn);
        User user = findUser(userId);
        if (book == null || user == null || !book.isAvailable()) {
            return false;
        }
        book.setAvailable(false);
        user.addLoan(isbn);
        Loan loan = new Loan(isbn, userId, dueDate);
        loanQueue.offer(loan);   // encolar (FIFO)
        undoStack.push("BORROW:" + isbn + ":" + userId); // apilar acción (LIFO)
        return true;
    }

    /**
     * Registra la devolución de un libro: vuelve a estar disponible y se
     * quita de la lista de préstamos de todos los usuarios.
     */
    public boolean returnBook(String isbn) {
        Book book = findBook(isbn);
        if (book == null || book.isAvailable()) {
            return false;
        }
        book.setAvailable(true);
        for (User u : users.values()) {
            u.removeLoan(isbn);
        }
        return true;
    }

    /**
     * Deshace la última acción registrada.
     * Gracias a la pila (LIFO) se recupera siempre la más reciente.
     * Si la acción era un préstamo, el libro vuelve a estar disponible.
     */
    public boolean undoLast() {
        if (undoStack.isEmpty()) return false;
        String action = undoStack.pop();

        if (action.startsWith("BORROW:")) {
            // Formato: BORROW:isbn:userId
            String[] parts = action.split(":");
            String isbn = parts[1];
            String userId = parts[2];
            Book book = findBook(isbn);
            User user = findUser(userId);
            if (book != null) book.setAvailable(true);
            if (user != null) user.removeLoan(isbn);
            return true;
        }

        if (action.startsWith("ADD_BOOK:")) {
            // Formato: ADD_BOOK:isbn
            String isbn = action.substring("ADD_BOOK:".length());
            Book book = findBook(isbn);
            if (book != null && book.isAvailable()) {
                books.remove(book);
                bookByIsbn.remove(isbn);
                return true;
            }
        }
        return false;
    }

    /** Elimina un socio del HashMap de usuarios. */
    public boolean removeUser(String id) {
        return users.remove(id) != null;
    }
}
