namespace Algorithms.Cli.Searching;

public static class BinarySearch
{
    public static int IndexOf<T>(IReadOnlyList<T> source, T value, IComparer<T>? comparer = null)
    {
        ArgumentNullException.ThrowIfNull(source);

        comparer ??= Comparer<T>.Default;
        var low = 0;
        var high = source.Count - 1;

        while (low <= high)
        {
            var middle = low + (high - low) / 2;
            var comparison = comparer.Compare(source[middle], value);

            if (comparison == 0)
            {
                return middle;
            }

            if (comparison < 0)
            {
                low = middle + 1;
            }
            else
            {
                high = middle - 1;
            }
        }

        return -1;
    }

    public static int IndexOf<T, TKey>(
        IReadOnlyList<T> source,
        TKey key,
        Func<T, TKey> keySelector,
        IComparer<TKey>? comparer = null)
    {
        ArgumentNullException.ThrowIfNull(source);
        ArgumentNullException.ThrowIfNull(keySelector);

        comparer ??= Comparer<TKey>.Default;
        var low = 0;
        var high = source.Count - 1;

        while (low <= high)
        {
            var middle = low + (high - low) / 2;
            var comparison = comparer.Compare(keySelector(source[middle]), key);

            if (comparison == 0)
            {
                return middle;
            }

            if (comparison < 0)
            {
                low = middle + 1;
            }
            else
            {
                high = middle - 1;
            }
        }

        return -1;
    }

    public static bool Contains<T>(IReadOnlyList<T> source, T value, IComparer<T>? comparer = null) =>
        IndexOf(source, value, comparer) >= 0;
}
