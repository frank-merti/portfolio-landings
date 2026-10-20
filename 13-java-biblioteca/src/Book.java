/**
 * Clase Book: representa un libro de la biblioteca.
 *
 * Encapsula los datos de un libro y expone sus propiedades mediante
 * getters/setters (ocultamiento de información, uno de los principios de POO).
 * El atributo {@code available} permite saber si el libro está en el
 * estante o prestado, por lo que el estado del préstamo queda dentro
 * del propio objeto y no disperso en otras clases.
 */
public class Book {
    /** Identificador único del libro (ISBN). */
    private final String isbn;

    /** Título del libro. */
    private String title;

    /** Autor del libro. */
    private String author;

    /** true si el libro está disponible para préstamo, false si está prestado. */
    private boolean available;

    /**
     * Constructor parametrizado.
     * Por defecto todo libro se crea disponible.
     */
    public Book(String isbn, String title, String author) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.available = true;
    }

    // --- Getters y setters ---

    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    /** Representación legible del libro, usada al imprimir en consola. */
    @Override
    public String toString() {
        return "[" + isbn + "] " + title + " - " + author
                + (available ? " (disponible)" : " (prestado)");
    }
}
