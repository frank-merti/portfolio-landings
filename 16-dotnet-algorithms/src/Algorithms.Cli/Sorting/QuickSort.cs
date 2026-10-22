namespace Algorithms.Cli.Sorting;

public static class QuickSort
{
    public static T[] Sort<T>(IReadOnlyList<T> source, IComparer<T>? comparer = null)
    {
        ArgumentNullException.ThrowIfNull(source);

        comparer ??= Comparer<T>.Default;
        var sorted = source.ToArray();
        SortRange(sorted, 0, sorted.Length - 1, comparer);
        return sorted;
    }

    private static void SortRange<T>(T[] items, int left, int right, IComparer<T> comparer)
    {
        if (left >= right)
        {
            return;
        }

        var pivotIndex = Partition(items, left, right, comparer);
        SortRange(items, left, pivotIndex - 1, comparer);
        SortRange(items, pivotIndex + 1, right, comparer);
    }

    private static int Partition<T>(T[] items, int left, int right, IComparer<T> comparer)
    {
        var pivot = items[right];
        var storeIndex = left;

        for (var i = left; i < right; i++)
        {
            if (comparer.Compare(items[i], pivot) <= 0)
            {
                (items[storeIndex], items[i]) = (items[i], items[storeIndex]);
                storeIndex++;
            }
        }

        (items[storeIndex], items[right]) = (items[right], items[storeIndex]);
        return storeIndex;
    }
}
