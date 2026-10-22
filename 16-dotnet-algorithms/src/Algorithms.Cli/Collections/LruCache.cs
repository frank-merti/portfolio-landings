namespace Algorithms.Cli.Collections;

/// <summary>
/// Fixed size cache with least recently used eviction policy.
/// </summary>
public sealed class LruCache<TKey, TValue> where TKey : notnull
{
    private readonly int _capacity;
    private readonly Dictionary<TKey, LinkedListNode<CacheEntry>> _entries;
    private readonly LinkedList<CacheEntry> _usageOrder = new();

    public LruCache(int capacity)
    {
        if (capacity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(capacity), "Capacity must be greater than zero.");
        }

        _capacity = capacity;
        _entries = new Dictionary<TKey, LinkedListNode<CacheEntry>>(capacity);
    }

    public int Count => _entries.Count;

    public bool TryGet(TKey key, out TValue value)
    {
        if (_entries.TryGetValue(key, out var node))
        {
            _usageOrder.Remove(node);
            _usageOrder.AddFirst(node);
            value = node.Value.Value;
            return true;
        }

        value = default!;
        return false;
    }

    public void Set(TKey key, TValue value)
    {
        if (_entries.TryGetValue(key, out var existing))
        {
            existing.Value = new CacheEntry(key, value);
            _usageOrder.Remove(existing);
            _usageOrder.AddFirst(existing);
            return;
        }

        if (_entries.Count >= _capacity)
        {
            var evicted = _usageOrder.Last!;
            _usageOrder.RemoveLast();
            _entries.Remove(evicted.Value.Key);
        }

        var node = new LinkedListNode<CacheEntry>(new CacheEntry(key, value));
        _usageOrder.AddFirst(node);
        _entries[key] = node;
    }

    public bool Remove(TKey key)
    {
        if (!_entries.TryGetValue(key, out var node))
        {
            return false;
        }

        _usageOrder.Remove(node);
        _entries.Remove(key);
        return true;
    }

    public void Clear()
    {
        _entries.Clear();
        _usageOrder.Clear();
    }

    public IReadOnlyList<TKey> KeysInUsageOrder() => _usageOrder.Select(entry => entry.Key).ToList();

    private sealed record CacheEntry(TKey Key, TValue Value);
}
