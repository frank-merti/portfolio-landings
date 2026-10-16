import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

/**
 * Central service: demonstrates several data structures and algorithms.
 *
 * Data structures:
 *  - ArrayList<Book>   catalog (ordered; used for sorting/searching)
 *  - HashMap<String,Book> quick lookup by ISBN
 *  - HashMap<String,User> users
 *  - Queue<Loan>         loan queue (FIFO)
 *  - Deque<String>       undo stack (LIFO)
 *  - HashSet<String>     categories (unique)
 *
 * Algorithms:
 *  - Merge Sort (by title and by author)
 *  - Binary Search (ISBN, over a sorted copy)
 *  - Linear Search (author / keyword)
 */
public class LibraryService {
    private final ArrayList<Book> books;
    private final HashMap<String, Book> bookByIsbn;
    private final HashMap<String, User> users;
    private final Queue<Loan> loanQueue;
    private final Deque<String> undoStack;
    private final Set<String> categories;

    public LibraryService() {
        books = new ArrayList<>();
        bookByIsbn = new HashMap<>();
        users = new HashMap<>();
        loanQueue = new LinkedList<>();
        undoStack = new ArrayDeque<>();
        categories = new HashSet<>();
    }

    /* ---------- seed ---------- */

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

    /* ---------- O(1) lookups ---------- */

    public Book findBook(String isbn) { return bookByIsbn.get(isbn); }
    public User findUser(String id) { return users.get(id); }

    public void addBook(Book b) {
        books.add(b);
        bookByIsbn.put(b.getIsbn(), b);
        undoStack.push("ADD_BOOK:" + b.getIsbn());
    }

    public void addUser(User u) { users.put(u.getId(), u); }

    public List<Book> getBooks() { return books; }
    public java.util.Map<String, User> getUsers() { return users; }
    public Set<String> getCategories() { return categories; }
    public Queue<Loan> getLoanQueue() { return loanQueue; }

    /* ---------- linear search ---------- */

    public List<Book> searchByAuthor(String author) {
        List<Book> result = new ArrayList<>();
        String needle = author.toLowerCase();
        for (Book b : books) {
            if (b.getAuthor().toLowerCase().contains(needle)) result.add(b);
        }
        return result;
    }

    /* ---------- binary search (ISBN) ---------- */

    public Book binarySearchByIsbn(String isbn) {
        ArrayList<Book> sorted = new ArrayList<>(books);
        mergeSortByIsbn(sorted, 0, sorted.size() - 1); // prepare sorted copy
        int lo = 0, hi = sorted.size() - 1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            int cmp = sorted.get(mid).getIsbn().compareTo(isbn);
            if (cmp == 0) return sorted.get(mid);
            if (cmp < 0) lo = mid + 1;
            else hi = mid - 1;
        }
        return null;
    }

    /* ---------- merge sort ---------- */

    public void sortByTitle() { mergeSortByTitle(books, 0, books.size() - 1); }
    public void sortByAuthor() { mergeSortByAuthor(books, 0, books.size() - 1); }

    private void mergeSortByTitle(List<Book> list, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSortByTitle(list, left, mid);
        mergeSortByTitle(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getTitle().compareToIgnoreCase(b.getTitle()));
    }

    private void mergeSortByAuthor(List<Book> list, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSortByAuthor(list, left, mid);
        mergeSortByAuthor(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getAuthor().compareToIgnoreCase(b.getAuthor()));
    }

    private void mergeSortByIsbn(List<Book> list, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSortByIsbn(list, left, mid);
        mergeSortByIsbn(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getIsbn().compareTo(b.getIsbn()));
    }

    @FunctionalInterface
    private interface BookComparator { int compare(Book a, Book b); }

    private void merge(List<Book> list, int left, int mid, int right, BookComparator cmp) {
        List<Book> tmp = new ArrayList<>(right - left + 1);
        int i = left, j = mid + 1;
        while (i <= mid && j <= right) {
            if (cmp.compare(list.get(i), list.get(j)) <= 0) tmp.add(list.get(i++));
            else tmp.add(list.get(j++));
        }
        while (i <= mid) tmp.add(list.get(i++));
        while (j <= right) tmp.add(list.get(j++));
        for (int k = 0; k < tmp.size(); k++) list.set(left + k, tmp.get(k));
    }

    /* ---------- loans ---------- */

    public boolean borrowBook(String isbn, String userId, String dueDate) {
        Book book = findBook(isbn);
        User user = findUser(userId);
        if (book == null || user == null || !book.isAvailable()) return false;
        book.setAvailable(false);
        user.addLoan(isbn);
        Loan loan = new Loan(isbn, userId, dueDate);
        loanQueue.offer(loan);
        undoStack.push("BORROW:" + isbn + ":" + userId);
        return true;
    }

    public boolean returnBook(String isbn) {
        Book book = findBook(isbn);
        if (book == null || book.isAvailable()) return false;
        book.setAvailable(true);
        for (User u : users.values()) u.removeLoan(isbn);
        return true;
    }

    public boolean undoLast() {
        if (undoStack.isEmpty()) return false;
        String action = undoStack.pop();
        if (action.startsWith("BORROW:")) {
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

    public boolean removeUser(String id) {
        return users.remove(id) != null;
    }
}
