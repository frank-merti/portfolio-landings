import java.util.ArrayList;

public class User {

    private final String id;
    private String name;
    private final ArrayList<String> loanedIsbns;

    public User(String id, String name) {
        this.id = id;
        this.name = name;
        this.loanedIsbns = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<String> getLoanedIsbns() {
        return loanedIsbns;
    }

    public void addLoan(String isbn) {
        loanedIsbns.add(isbn);
    }

    public boolean removeLoan(String isbn) {
        return loanedIsbns.remove(isbn);
    }

    @Override
    public String toString() {
        return String.format("%s - %s (%d loans)", id, name, loanedIsbns.size());
    }
}
