import java.util.List;
import java.util.Map;
import java.util.Scanner;

/** Console entry point. */
public class Main {

    public static void main(String[] args) {
        LibraryService library = new LibraryService();
        library.seed();

        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            printMenu();
            String option = readLine(scanner, Messages.t("prompt.option"));

            switch (option) {
                case "1" -> addBook(scanner, library);
                case "2" -> addUser(scanner, library);
                case "3" -> searchByIsbn(scanner, library);
                case "4" -> searchByAuthor(scanner, library);
                case "5" -> {
                    library.sortByTitle();
                    System.out.println(Messages.t("msg.sorted_title"));
                }
                case "6" -> {
                    library.sortByAuthor();
                    System.out.println(Messages.t("msg.sorted_author"));
                }
                case "7" -> borrow(scanner, library);
                case "8" -> returnBook(scanner, library);
                case "9" -> System.out.println(library.undoLast()
                        ? Messages.t("msg.undone")
                        : Messages.t("msg.nothing_to_undo"));
                case "10" -> library.getBooks().forEach(System.out::println);
                case "11" -> {
                    for (Map.Entry<String, User> entry : library.getUsers().entrySet()) {
                        System.out.println(entry.getValue());
                    }
                }
                case "12" -> toggleLanguage();
                case "13" -> running = false;
                default -> System.out.println(Messages.t("msg.invalid_option"));
            }
            System.out.println();
        }
        System.out.println(Messages.t("msg.goodbye"));
    }

    private static void printMenu() {
        System.out.println(Messages.t("app.title"));
        System.out.println(Messages.t("menu.add_book"));
        System.out.println(Messages.t("menu.add_user"));
        System.out.println(Messages.t("menu.search_isbn"));
        System.out.println(Messages.t("menu.search_author"));
        System.out.println(Messages.t("menu.sort_title"));
        System.out.println(Messages.t("menu.sort_author"));
        System.out.println(Messages.t("menu.borrow"));
        System.out.println(Messages.t("menu.return"));
        System.out.println(Messages.t("menu.undo"));
        System.out.println(Messages.t("menu.list_books"));
        System.out.println(Messages.t("menu.list_users"));
        System.out.println(Messages.t("menu.language"));
        System.out.println(Messages.t("menu.exit"));
    }

    private static String readLine(Scanner scanner, String label) {
        System.out.print(label + ": ");
        return scanner.nextLine().trim();
    }

    private static void toggleLanguage() {
        Messages.setLanguage("en".equals(Messages.getLanguage()) ? "es" : "en");
        System.out.println(Messages.t("msg.language_changed"));
    }

    private static void addBook(Scanner scanner, LibraryService library) {
        String isbn = readLine(scanner, Messages.t("prompt.isbn"));
        String title = readLine(scanner, Messages.t("prompt.title"));
        String author = readLine(scanner, Messages.t("prompt.author"));
        library.addBook(new Book(isbn, title, author));
        System.out.println(Messages.t("msg.book_added"));
    }

    private static void addUser(Scanner scanner, LibraryService library) {
        String id = readLine(scanner, Messages.t("prompt.id"));
        String name = readLine(scanner, Messages.t("prompt.name"));
        library.addUser(new User(id, name));
        System.out.println(Messages.t("msg.user_added"));
    }

    private static void searchByIsbn(Scanner scanner, LibraryService library) {
        String isbn = readLine(scanner, Messages.t("prompt.isbn"));
        Book book = library.binarySearchByIsbn(isbn);
        System.out.println(book == null ? Messages.t("msg.not_found") : book);
    }

    private static void searchByAuthor(Scanner scanner, LibraryService library) {
        String author = readLine(scanner, Messages.t("prompt.author"));
        List<Book> result = library.searchByAuthor(author);
        if (result.isEmpty()) {
            System.out.println(Messages.t("msg.no_results"));
        } else {
            result.forEach(System.out::println);
        }
    }

    private static void borrow(Scanner scanner, LibraryService library) {
        String isbn = readLine(scanner, Messages.t("prompt.isbn"));
        String userId = readLine(scanner, Messages.t("prompt.user_id"));
        String dueDate = readLine(scanner, Messages.t("prompt.due_date"));
        boolean success = library.borrowBook(isbn, userId, dueDate);
        System.out.println(success
                ? Messages.t("msg.borrow_ok")
                : Messages.t("msg.borrow_error"));
    }

    private static void returnBook(Scanner scanner, LibraryService library) {
        String isbn = readLine(scanner, Messages.t("prompt.isbn"));
        System.out.println(library.returnBook(isbn)
                ? Messages.t("msg.return_ok")
                : Messages.t("msg.return_error"));
    }
}
