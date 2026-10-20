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

/** Library domain service: catalog, users, loans and undo support. */
public class LibraryService {

    private final ArrayList<Book> books;
    private final HashMap<String, Book> bookByIsbn;
    private final HashMap<String, User> users;
    private final Queue<Loan> loanQueue;
    private final Deque<String> undoStack;
    private final Set<String> categories;

    public LibraryService() {
        this.books = new ArrayList<>();
        this.bookByIsbn = new HashMap<>();
        this.users = new HashMap<>();
        this.loanQueue = new LinkedList<>();
        this.undoStack = new ArrayDeque<>();
        this.categories = new HashSet<>();
    }

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

    public Book findBook(String isbn) {
        return bookByIsbn.get(isbn);
    }

    public User findUser(String id) {
        return users.get(id);
    }

    public void addBook(Book book) {
        books.add(book);
        bookByIsbn.put(book.getIsbn(), book);
        undoStack.push("ADD_BOOK:" + book.getIsbn());
    }

    public void addUser(User user) {
        users.put(user.getId(), user);
    }

    public List<Book> getBooks() {
        return books;
    }

    public Map<String, User> getUsers() {
        return users;
    }

    public Set<String> getCategories() {
        return categories;
    }

    public Queue<Loan> getLoanQueue() {
        return loanQueue;
    }

    public List<Book> searchByAuthor(String author) {
        List<Book> result = new ArrayList<>();
        String needle = author.toLowerCase();
        for (Book book : books) {
            if (book.getAuthor().toLowerCase().contains(needle)) {
                result.add(book);
            }
        }
        return result;
    }

    public Book binarySearchByIsbn(String isbn) {
        ArrayList<Book> sorted = new ArrayList<>(books);
        mergeSortByIsbn(sorted, 0, sorted.size() - 1);

        int low = 0;
        int high = sorted.size() - 1;
        while (low <= high) {
            int mid = (low + high) >>> 1;
            int comparison = sorted.get(mid).getIsbn().compareTo(isbn);
            if (comparison == 0) {
                return sorted.get(mid);
            } else if (comparison < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return null;
    }

    public void sortByTitle() {
        mergeSortByTitle(books, 0, books.size() - 1);
    }

    public void sortByAuthor() {
        mergeSortByAuthor(books, 0, books.size() - 1);
    }

    private void mergeSortByTitle(List<Book> list, int left, int right) {
        if (left >= right) {
            return;
        }
        int mid = (left + right) / 2;
        mergeSortByTitle(list, left, mid);
        mergeSortByTitle(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getTitle().compareToIgnoreCase(b.getTitle()));
    }

    private void mergeSortByAuthor(List<Book> list, int left, int right) {
        if (left >= right) {
            return;
        }
        int mid = (left + right) / 2;
        mergeSortByAuthor(list, left, mid);
        mergeSortByAuthor(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getAuthor().compareToIgnoreCase(b.getAuthor()));
    }

    private void mergeSortByIsbn(List<Book> list, int left, int right) {
        if (left >= right) {
            return;
        }
        int mid = (left + right) / 2;
        mergeSortByIsbn(list, left, mid);
        mergeSortByIsbn(list, mid + 1, right);
        merge(list, left, mid, right, (a, b) -> a.getIsbn().compareTo(b.getIsbn()));
    }

    @FunctionalInterface
    private interface BookComparator {
        int compare(Book a, Book b);
    }

    private void merge(List<Book> list, int left, int mid, int right, BookComparator comparator) {
        List<Book> buffer = new ArrayList<>(right - left + 1);
        int i = left;
        int j = mid + 1;

        while (i <= mid && j <= right) {
            if (comparator.compare(list.get(i), list.get(j)) <= 0) {
                buffer.add(list.get(i++));
            } else {
                buffer.add(list.get(j++));
            }
        }
        while (i <= mid) {
            buffer.add(list.get(i++));
        }
        while (j <= right) {
            buffer.add(list.get(j++));
        }
        for (int k = 0; k < buffer.size(); k++) {
            list.set(left + k, buffer.get(k));
        }
    }

    public boolean borrowBook(String isbn, String userId, String dueDate) {
        Book book = findBook(isbn);
        User user = findUser(userId);
        if (book == null || user == null || !book.isAvailable()) {
            return false;
        }
        book.setAvailable(false);
        user.addLoan(isbn);
        loanQueue.offer(new Loan(isbn, userId, dueDate));
        undoStack.push("BORROW:" + isbn + ":" + userId);
        return true;
    }

    public boolean returnBook(String isbn) {
        Book book = findBook(isbn);
        if (book == null || book.isAvailable()) {
            return false;
        }
        book.setAvailable(true);
        for (User user : users.values()) {
            user.removeLoan(isbn);
        }
        return true;
    }

    public boolean undoLast() {
        if (undoStack.isEmpty()) {
            return false;
        }
        String action = undoStack.pop();

        if (action.startsWith("BORROW:")) {
            String[] parts = action.split(":");
            Book book = findBook(parts[1]);
            User user = findUser(parts[2]);
            if (book != null) {
                book.setAvailable(true);
            }
            if (user != null) {
                user.removeLoan(parts[1]);
            }
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
