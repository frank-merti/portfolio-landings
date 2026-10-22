namespace Algorithms.Cli.Sorting;

public static class MergeSort
{
    public static T[] Sort<T>(IReadOnlyList<T> source, IComparer<T>? comparer = null)
    {
        ArgumentNullException.ThrowIfNull(source);

        comparer ??= Comparer<T>.Default;
        var buffer = new T[source.Count];
        var sorted = source.ToArray();
        SortRange(sorted, buffer, 0, sorted.Length - 1, comparer);
        return sorted;
    }

    private static void SortRange<T>(T[] items, T[] buffer, int left, int right, IComparer<T> comparer)
    {
        if (left >= right)
        {
            return;
        }

        var middle = left + (right - left) / 2;
        SortRange(items, buffer, left, middle, comparer);
        SortRange(items, buffer, middle + 1, right, comparer);
        Merge(items, buffer, left, middle, right, comparer);
    }

    private static void Merge<T>(T[] items, T[] buffer, int left, int middle, int right, IComparer<T> comparer)
    {
        Array.Copy(items, left, buffer, left, right - left + 1);

        var i = left;
        var j = middle + 1;

        for (var k = left; k <= right; k++)
        {
            if (i > middle)
            {
                items[k] = buffer[j++];
            }
            else if (j > right)
            {
                items[k] = buffer[i++];
            }
            else if (comparer.Compare(buffer[i], buffer[j]) <= 0)
            {
                items[k] = buffer[i++];
            }
            else
            {
                items[k] = buffer[j++];
            }
        }
    }
}
