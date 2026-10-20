import java.util.ArrayList;

/**
 * Clase User: representa a un socio de la biblioteca.
 *
 * Cada usuario guarda la lista de ISBN que tiene prestados. De esta forma
 * el usuario es responsable de su propia información (encapsulamiento) y el
 * servicio de la biblioteca solo necesita pedirle la información, sin
 * modificarla directamente.
 */
public class User {
    /** Identificador único del socio. */
    private final String id;

    /** Nombre completo del socio. */
    private String name;

    /** Lista de ISBNs actuellement prestados a este usuario. */
    private final ArrayList<String> loanedIsbns;

    /** Constructor parametrizado: crea al usuario sin préstamos. */
    public User(String id, String name) {
        this.id = id;
        this.name = name;
        this.loanedIsbns = new ArrayList<>();
    }

    // --- Getters y setters ---

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public ArrayList<String> getLoanedIsbns() { return loanedIsbns; }

    /**
     * Registra un préstamo en la lista del usuario.
     * Se usa una ArrayList porque el orden de inserción es útil para
     * mostrar el historial de préstamos.
     */
    public void addLoan(String isbn) {
        loanedIsbns.add(isbn);
    }

    /**
     * Elimina un préstamo del usuario.
     * @return true si el préstamo existió y se eliminó, false si no había.
     */
    public boolean removeLoan(String isbn) {
        return loanedIsbns.remove(isbn);
    }

    /** Representación legible del usuario, usada al imprimir en consola. */
    @Override
    public String toString() {
        return id + " - " + name + " (" + loanedIsbns.size() + " préstamos)";
    }
}
