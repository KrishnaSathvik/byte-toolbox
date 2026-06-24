export const content = `Managing timestamps in distributed systems is more complex than it seems. For everyday Unix ↔ date conversions, start with the [Timestamp Converter](/timestamp) and the [Unix timestamp cheat sheet](/blog/unix-timestamp-to-date-developer-cheat-sheet).

This guide covers timezone handling, clock synchronization, timestamp formats, and best practices for building robust distributed applications.

## The Challenges of Timestamp Management

### Common Problems
1. **Clock Skew**: Different servers have slightly different times
2. **Timezone Confusion**: Users in different timezones see different times
3. **Leap Seconds**: Occasional adjustments to UTC
4. **Network Delays**: Timestamps arrive out of order
5. **Data Migration**: Moving data between systems with different time handling

### Real-World Impact
\`\`\`javascript
// Problem: Clock skew causing data inconsistencies
const server1Time = new Date('2024-01-15T10:30:00Z'); // Server 1
const server2Time = new Date('2024-01-15T10:30:05Z'); // Server 2 (5 seconds ahead)

// User action happens at 10:30:02
// Server 1 records: 10:30:00 (before action)
// Server 2 records: 10:30:05 (after action)
// Data appears out of order!
\`\`\`

## Timestamp Formats and Standards

### ISO 8601 (Recommended)
\`\`\`javascript
// ISO 8601 format with timezone
const iso8601 = '2024-01-15T10:30:00Z'; // UTC
const iso8601WithTz = '2024-01-15T10:30:00+05:00'; // With timezone offset

// JavaScript Date parsing
const date = new Date('2024-01-15T10:30:00Z');
console.log(date.toISOString()); // Always outputs UTC
\`\`\`

### Unix Timestamps
\`\`\`javascript
// Unix timestamp (seconds since epoch)
const unixTimestamp = Math.floor(Date.now() / 1000); // 1705312200

// Convert to Date
const date = new Date(unixTimestamp * 1000);

// Convert to ISO string
const isoString = date.toISOString();
\`\`\`

## Timezone Handling

### Store Everything in UTC
\`\`\`javascript
// ALWAYS store timestamps in UTC
const userAction = {
  id: 'action-123',
  timestamp: new Date().toISOString(), // UTC
  userId: 'user-456',
  action: 'login'
};

// Convert to user's timezone for display
const displayTime = (utcTimestamp, userTimezone) => {
  const date = new Date(utcTimestamp);
  return date.toLocaleString('en-US', {
    timeZone: userTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

console.log(displayTime('2024-01-15T10:30:00Z', 'America/New_York'));
// Output: 01/15/2024, 05:30:00 AM
\`\`\`

## Clock Synchronization

### NTP (Network Time Protocol)
\`\`\`javascript
// Check if system time is synchronized
const checkTimeSync = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
    const data = await response.json();
    const serverTime = new Date(data.utc_datetime);
    const localTime = new Date();
    const diff = Math.abs(serverTime - localTime);
    
    return {
      synchronized: diff < 5000, // Within 5 seconds
      difference: diff,
      serverTime: serverTime.toISOString(),
      localTime: localTime.toISOString()
    };
  } catch (error) {
    console.error('Time sync check failed:', error);
    return { synchronized: false, error };
  }
};
\`\`\`

## Best Practices Summary

1. **Always store in UTC**: Convert to user's timezone only for display
2. **Use ISO 8601 format**: Standardized, unambiguous timestamp format
3. **Handle timezone preferences**: Store and respect user's timezone
4. **Implement clock synchronization**: Use NTP or logical clocks
5. **Validate timestamps**: Check for reasonable ranges and formats
6. **Index timestamp columns**: For efficient range queries
7. **Consider partitioning**: For large time-series data
8. **Handle edge cases**: Leap seconds, DST transitions, clock skew
9. **Test thoroughly**: Especially timezone and DST logic
10. **Document timezone handling**: Make it clear how timestamps are handled

## Conclusion

Timestamp management in distributed systems requires careful consideration of timezones, clock synchronization, and edge cases. By following these best practices and using appropriate tools and techniques, you can build robust systems that handle time correctly across different environments and user preferences.`;
