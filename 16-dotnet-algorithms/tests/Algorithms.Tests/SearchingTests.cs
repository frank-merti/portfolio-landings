using Algorithms.Cli.Searching;

namespace Algorithms.Tests;

public class SearchingTests
{
    [Fact]
    public void BinarySearch_finds_the_element()
    {
        var values = new[] { 1, 3, 5, 7, 9, 11 };

        var index = BinarySearch.IndexOf(values, 7);

        Assert.Equal(3, index);
    }

    [Fact]
    public void BinarySearch_returns_minus_one_when_missing()
    {
        var values = new[] { 1, 3, 5, 7, 9, 11 };

        Assert.Equal(-1, BinarySearch.IndexOf(values, 8));
    }

    [Fact]
    public void BinarySearch_supports_a_custom_comparer()
    {
        var values = new[] { "apple", "banana", "cherry" };

        var index = BinarySearch.IndexOf(values, "banana", StringComparer.Ordinal);

        Assert.Equal(1, index);
    }

    [Fact]
    public void Contains_reflects_the_search_result()
    {
        var values = new[] { 2, 4, 6 };

        Assert.True(BinarySearch.Contains(values, 6));
        Assert.False(BinarySearch.Contains(values, 5));
    }

    [Fact]
    public void BinarySearch_handles_empty_input()
    {
        Assert.Equal(-1, BinarySearch.IndexOf(Array.Empty<int>(), 3));
    }
}
