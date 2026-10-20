public class Loan {

    private final String isbn;
    private final String userId;
    private final String dueDate;

    public Loan(String isbn, String userId, String dueDate) {
        this.isbn = isbn;
        this.userId = userId;
        this.dueDate = dueDate;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getUserId() {
        return userId;
    }

    public String getDueDate() {
        return dueDate;
    }

    @Override
    public String toString() {
        return String.format("Loan{isbn=%s, userId=%s, dueDate=%s}", isbn, userId, dueDate);
    }
}
