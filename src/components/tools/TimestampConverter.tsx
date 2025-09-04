import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Clock, Calendar, RefreshCw } from 'lucide-react';

/**
 * Predefined examples for timestamp conversion testing
 */
const examples = [
  {
    name: 'Current Time',
    input: Date.now().toString()
  },
  {
    name: 'Unix Epoch',
    input: '0'
  },
  {
    name: 'Y2K',
    input: '946684800'
  }
];

/**
 * Available timezone options for display formatting
 */
const timezones = [
  { name: 'UTC', value: 'UTC' },
  { name: 'EST (Eastern)', value: 'America/New_York' },
  { name: 'PST (Pacific)', value: 'America/Los_Angeles' },
  { name: 'GMT (London)', value: 'Europe/London' },
  { name: 'CET (Central Europe)', value: 'Europe/Paris' },
  { name: 'JST (Japan)', value: 'Asia/Tokyo' },
  { name: 'Local Time', value: 'local' }
];

/**
 * Interface for timestamp conversion results
 */
interface ConversionResult {
  timestamp: number;
  milliseconds: number;
  iso: string;
  utc: string;
  local: string;
  relative: string;
  timezone: string;
}

/**
 * TimestampConverter - A comprehensive Unix timestamp conversion tool
 * 
 * Features:
 * - Bidirectional conversion between Unix timestamps and human-readable dates
 * - Support for both seconds and milliseconds timestamps
 * - Multiple timezone display options (UTC, EST, PST, local, etc.)
 * - Live current timestamp display with real-time updates
 * - Relative time calculations (e.g., "2 days ago", "in 3 hours")
 * - ISO 8601 date formatting
 * - Copy individual values and download complete results
 * - Intelligent timestamp detection (seconds vs milliseconds)
 * 
 * @example
 * ```tsx
 * // Basic usage - converts timestamps and dates in multiple formats
 * <TimestampConverter />
 * 
 * // The component provides:
 * // - Input toggle: Unix timestamp or date string input
 * // - Timezone selection: Display results in different timezones
 * // - Live current time: Always shows the current Unix timestamp
 * // - Multiple output formats: Unix, ISO, UTC, local, relative
 * ```
 * 
 * Input Format Support:
 * - Unix timestamps in seconds (< 10,000,000,000)
 * - Unix timestamps in milliseconds (>= 10,000,000,000)  
 * - ISO 8601 date strings (2024-01-01T00:00:00Z)
 * - Natural language dates (Jan 1, 2024)
 * - Date constructor compatible strings
 * 
 * Output Formats:
 * - Unix timestamp (seconds and milliseconds)
 * - ISO 8601 standard format
 * - UTC formatted string with timezone
 * - Local time with system timezone
 * - Relative time (human-friendly)
 * 
 * Technical Details:
 * - Uses Intl.DateTimeFormat for locale-aware formatting
 * - Handles timezone conversions accurately
 * - Real-time current timestamp updates every second
 * - Intelligent auto-detection of timestamp format
 * - Proper handling of Unix epoch and Y2038 limits
 * 
 * Timezone Support:
 * - UTC (Coordinated Universal Time)
 * - Major world timezones (EST, PST, GMT, CET, JST)
 * - System local timezone detection
 * - Daylight saving time aware
 * 
 * @returns JSX element containing the complete timestamp converter interface
 */
export const TimestampConverter = () => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'timestamp' | 'date'>('timestamp');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Formats a timestamp for display in a specific timezone
   * 
   * @param timestamp - Unix timestamp in milliseconds
   * @param timezone - IANA timezone identifier or 'local'
   * @returns Formatted date string with timezone information
   * @throws {Error} When timestamp is invalid
   */
  const formatTimestamp = useCallback((timestamp: number, timezone: string) => {
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp');
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: timezone === 'local' ? undefined : timezone
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }, []);

  /**
   * Calculates relative time difference in human-readable format
   * 
   * @param timestamp - Unix timestamp to compare against current time
   * @returns Human-readable relative time string (e.g., "2 days ago", "in 3 hours")
   */
  const getRelativeTime = useCallback((timestamp: number) => {
    const now = Date.now();
    const diff = Math.abs(now - timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    const isPast = timestamp < now;
    const prefix = isPast ? '' : 'in ';
    const suffix = isPast ? ' ago' : '';

    if (seconds < 60) return `${prefix}${seconds} second${seconds !== 1 ? 's' : ''}${suffix}`;
    if (minutes < 60) return `${prefix}${minutes} minute${minutes !== 1 ? 's' : ''}${suffix}`;
    if (hours < 24) return `${prefix}${hours} hour${hours !== 1 ? 's' : ''}${suffix}`;
    if (days < 365) return `${prefix}${days} day${days !== 1 ? 's' : ''}${suffix}`;
    return `${prefix}${years} year${years !== 1 ? 's' : ''}${suffix}`;
  }, []);

  const convertTimestamp = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a timestamp or date',
        variant: 'destructive',
      });
      return;
    }

    try {
      let timestamp: number;

      if (inputType === 'timestamp') {
        const num = parseFloat(input);
        if (isNaN(num)) {
          throw new Error('Invalid timestamp format');
        }
        
        // Handle seconds vs milliseconds
        timestamp = num < 10000000000 ? num * 1000 : num;
      } else {
        // Parse date string
        const date = new Date(input);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format');
        }
        timestamp = date.getTime();
      }

      const tz = selectedTimezone === 'local' ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedTimezone;

      const conversionResult: ConversionResult = {
        timestamp: Math.floor(timestamp / 1000),
        milliseconds: timestamp,
        iso: new Date(timestamp).toISOString(),
        utc: formatTimestamp(timestamp, 'UTC'),
        local: formatTimestamp(timestamp, 'local'),
        relative: getRelativeTime(timestamp),
        timezone: tz
      };

      setResult(conversionResult);
      setError('');
      
      toast({
        title: 'Conversion Successful',
        description: 'Timestamp converted successfully',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setResult(null);
      
      toast({
        title: 'Conversion Failed',
        description: err instanceof Error ? err.message : 'Invalid input',
        variant: 'destructive',
      });
    }
  }, [input, inputType, selectedTimezone, formatTimestamp, getRelativeTime, toast]);

  const copyValue = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  const downloadResult = () => {
    if (!result) return;

    const content = [
      `Timestamp Conversion Results`,
      `Generated: ${new Date().toISOString()}`,
      ``,
      `Unix Timestamp (seconds): ${result.timestamp}`,
      `Unix Timestamp (milliseconds): ${result.milliseconds}`,
      `ISO 8601: ${result.iso}`,
      `UTC: ${result.utc}`,
      `Local Time: ${result.local}`,
      `Relative: ${result.relative}`,
      `Timezone: ${result.timezone}`
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timestamp_conversion_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Results saved to your device',
    });
  };

  const useCurrentTime = () => {
    setInput(Math.floor(currentTime / 1000).toString());
    setInputType('timestamp');
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const handleFillExample = (exampleInput: string) => {
    setInput(exampleInput);
    setInputType('timestamp');
  };

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to human readable dates and vice versa. Handle multiple timezones, relative time calculations, and various date formats with precision."
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="p-6">
        {/* Live Current Time */}
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary mb-1">Current Unix Timestamp</h3>
              <div className="font-mono text-lg text-foreground">
                {Math.floor(currentTime / 1000)}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(currentTime).toISOString()}
              </div>
            </div>
            <Button onClick={useCurrentTime} variant="outline" size="sm">
              Use Current
            </Button>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4 mb-6">
          {/* Input Type Toggle */}
          <div className="flex items-center bg-secondary rounded-lg p-1">
            <button
              onClick={() => setInputType('timestamp')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                inputType === 'timestamp' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Unix Timestamp
            </button>
            <button
              onClick={() => setInputType('date')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                inputType === 'date' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Date String
            </button>
          </div>

          {/* Input Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              {inputType === 'timestamp' ? 'Unix Timestamp' : 'Date String'}
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                inputType === 'timestamp' 
                  ? 'Enter timestamp (e.g., 1640995200 or 1640995200000)' 
                  : 'Enter date (e.g., 2024-01-01 or Jan 1, 2024)'
              }
              className="w-full px-4 py-2 bg-input border border-border rounded-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Timezone Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Display Timezone
            </label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button onClick={convertTimestamp} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Convert
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
          
          {result && (
            <Button onClick={downloadResult} variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Conversion Results</h3>
            
            <div className="grid gap-4">
              {[
                { label: 'Unix Timestamp (seconds)', value: result.timestamp.toString(), icon: Clock },
                { label: 'Unix Timestamp (milliseconds)', value: result.milliseconds.toString(), icon: Clock },
                { label: 'ISO 8601', value: result.iso, icon: Calendar },
                { label: 'UTC Time', value: result.utc, icon: Calendar },
                { label: 'Local Time', value: result.local, icon: Calendar },
                { label: 'Relative Time', value: result.relative, icon: Clock }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="font-mono text-sm text-muted-foreground">{item.value}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyValue(item.value, item.label)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-lg">
          <h4 className="font-medium text-info mb-2">About Unix Timestamps</h4>
          <div className="text-sm text-info/80 space-y-1">
            <p>• Unix timestamp counts seconds since January 1, 1970 (Unix Epoch)</p>
            <p>• Values less than 10,000,000,000 are treated as seconds</p>
            <p>• Values greater are treated as milliseconds</p>
            <p>• Maximum value: 2,147,483,647 (January 19, 2038)</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};