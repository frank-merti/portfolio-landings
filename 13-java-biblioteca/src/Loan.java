/**
 * Clase Loan: modela un préstamo de un libro a un usuario.
 *
 * Es una clase "de valor" (value object): todos sus datos son inmutables y
 * se crean una sola vez con el constructor. Así se evita que un préstamo
 * cambie de usuario o de libro por error.
 */
public class Loan {
    /** ISBN del libro prestado. */
    private final String isbn;

    /** Id del usuario que recibe el préstamo. */
    private final String userId;

    /** Fecha de vencimiento del préstamo (formato dd/mm/aaaa). */
    private final String dueDate;

    /** Constructor parametrizado. */
    public Loan(String isbn, String userId, String dueDate) {
        this.isbn = isbn;
        this.userId = userId;
        this.dueDate = dueDate;
    }

    // --- Getters ---

    public String getIsbn() { return isbn; }
    public String getUserId() { return userId; }
    public String getDueDate() { return dueDate; }

    /** Representación legible del préstamo. */
    @Override
    public String toString() {
        return "Préstamo {isbn=" + isbn + ", userId=" + userId + ", vence=" + dueDate + "}";
    }
}
