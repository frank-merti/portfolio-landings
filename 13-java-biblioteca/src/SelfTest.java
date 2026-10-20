/** Dependency-free self test for the library domain service. */
import java.util.List;

public class SelfTest {

    private static int checks = 0;

    public static void main(String[] args) {
        LibraryService library = new LibraryService();
        library.seed();

        check(library.getBooks().size() == 4, "seed loads four books");
        check(library.getUsers().size() == 2, "seed loads two users");
        check(library.findBook("978-2") != null, "hashmap lookup by isbn");
        check(library.findBook("missing") == null, "lookup returns null when absent");

        library.sortByTitle();
        String firstTitle = library.getBooks().get(0).getTitle();
        check(firstTitle.equalsIgnoreCase("Clean Code"), "merge sort by title");

        library.sortByAuthor();
        String firstAuthor = library.getBooks().get(0).getAuthor();
        check(firstAuthor.equalsIgnoreCase("Erich Gamma"), "merge sort by author");

        Book found = library.binarySearchByIsbn("978-3");
        check(found != null && found.getTitle().equals("Effective Java"), "binary search finds a book");
        check(library.binarySearchByIsbn("000-0") == null, "binary search returns null when absent");

        List<Book> byAuthor = library.searchByAuthor("martin");
        check(byAuthor.size() == 1, "linear search by author");

        check(library.borrowBook("978-1", "U1", "01/01/2027"), "loan is registered");
        check(!library.borrowBook("978-1", "U1", "01/01/2027"), "borrowed book cannot be loaned twice");
        check(library.getLoanQueue().size() == 1, "loan queue receives the loan");
        check(library.findBook("978-1") != null && !library.findBook("978-1").isAvailable(), "book is marked as loaned");

        check(library.undoLast(), "undo pops the last action");
        check(library.findBook("978-1").isAvailable(), "undo releases the book");
        check(library.getLoanQueue().size() == 1, "undo keeps the loan history");

        check(library.borrowBook("978-1", "U1", "01/01/2027"), "loan can be registered again");
        check(library.returnBook("978-1"), "book can be returned");
        check(!library.returnBook("978-1"), "returning twice fails");

        System.out.println("SelfTest: " + checks + " checks passed.");
    }

    private static void check(boolean condition, String description) {
        checks++;
        if (!condition) {
            System.out.println("FAILED: " + description);
            System.exit(1);
        }
    }
}
