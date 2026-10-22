using Algorithms.Cli.Collections;

namespace Algorithms.Tests;

public class LruCacheTests
{
    [Fact]
    public void Stores_and_reads_values()
    {
        var cache = new LruCache<string, int>(2);
        cache.Set("a", 1);

        Assert.True(cache.TryGet("a", out var value));
        Assert.Equal(1, value);
    }

    [Fact]
    public void Evicts_the_least_recently_used_entry()
    {
        var cache = new LruCache<string, int>(2);
        cache.Set("a", 1);
        cache.Set("b", 2);
        cache.Set("c", 3);

        Assert.False(cache.TryGet("a", out _));
        Assert.True(cache.TryGet("b", out _));
        Assert.True(cache.TryGet("c", out _));
    }

    [Fact]
    public void Reading_marks_an_entry_as_recently_used()
    {
        var cache = new LruCache<string, int>(2);
        cache.Set("a", 1);
        cache.Set("b", 2);
        cache.TryGet("a", out _);
        cache.Set("c", 3);

        Assert.True(cache.TryGet("a", out _));
        Assert.False(cache.TryGet("b", out _));
    }

    [Fact]
    public void Removes_and_clears_entries()
    {
        var cache = new LruCache<string, int>(2);
        cache.Set("a", 1);

        Assert.True(cache.Remove("a"));
        Assert.False(cache.Remove("a"));

        cache.Set("b", 2);
        cache.Clear();
        Assert.Equal(0, cache.Count);
    }

    [Fact]
    public void Rejects_invalid_capacity()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new LruCache<string, int>(0));
    }
}
