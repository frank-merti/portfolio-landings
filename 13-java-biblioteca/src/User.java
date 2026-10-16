/**
 * User entity.
 */
public class User {
    private final String id;
    private String name;
    private final java.util.ArrayList<String> loanedIsbns;

    public User(String id, String name) {
        this.id = id;
        this.name = name;
        this.loanedIsbns = new java.util.ArrayList<>();
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public java.util.ArrayList<String> getLoanedIsbns() { return loanedIsbns; }

    public void addLoan(String isbn) { loanedIsbns.add(isbn); }
    public boolean removeLoan(String isbn) { return loanedIsbns.remove(isbn); }

    @Override
    public String toString() {
        return id + " - " + name + " (" + loanedIsbns.size() + " préstamos)";
    }
}
