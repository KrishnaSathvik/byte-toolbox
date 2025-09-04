import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { trackToolUsage, trackConversion, trackError } from '@/lib/analytics';
import { Copy, Download, RefreshCw, Key, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Predefined examples for UUID generation quantities
 */
const examples = [
  {
    name: 'Single UUID',
    input: '1'
  },
  {
    name: '10 UUIDs',
    input: '10'
  },
  {
    name: '100 UUIDs',
    input: '100'
  }
];

/**
 * Props for the UuidGenerator component
 */
interface UuidGeneratorProps {
  /** Initial value to populate the quantity field */
  initialValue?: string;
}

/**
 * UuidGenerator - A professional UUID generation tool for developers
 * 
 * Features:
 * - Bulk UUID generation (1-1000 UUIDs at once)
 * - UUID v4 (random) generation using crypto-secure random numbers
 * - Flexible formatting options (uppercase, hyphen removal)
 * - Individual and bulk copy operations
 * - Download results as text files
 * - Real-time format preview
 * - Professional list interface with click-to-copy
 * 
 * @example
 * ```tsx
 * // Basic usage - generates UUIDs with customizable options
 * <UuidGenerator />
 * 
 * // The component provides:
 * // - Quantity selector (1-1000 UUIDs)
 * // - Format options: uppercase, remove hyphens
 * // - Bulk operations: copy all, download all
 * // - Individual UUID copy functionality
 * ```
 * 
 * UUID v4 Specifications:
 * - 128-bit random or pseudo-random numbers
 * - Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * - Version 4 indicated by the '4' in the third group
 * - Variant bits in the fourth group (y = 8, 9, A, or B)
 * - Extremely low collision probability (~5.3x10^-37)
 * 
 * Use Cases:
 * - Database primary keys and foreign keys
 * - API request identifiers and session IDs
 * - File naming and resource identification
 * - Distributed system node identification
 * - Test data generation for development
 * 
 * Technical Details:
 * - Uses uuid library's v4() function (crypto.getRandomValues)
 * - Supports bulk generation with performance optimization
 * - Memory-efficient handling of large UUID lists
 * - Format customization without regenerating UUIDs
 * 
 * @returns JSX element containing the complete UUID generator interface
 */
export const UuidGenerator = ({ initialValue = '' }: UuidGeneratorProps = {}) => {
  const [quantity, setQuantity] = useState(initialValue ? parseInt(initialValue) || 1 : 1);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  // Update quantity when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      const parsed = parseInt(initialValue);
      if (!isNaN(parsed) && parsed > 0) {
        setQuantity(parsed);
      }
    }
  }, [initialValue]);
  const [uuids, setUuids] = useState<string[]>([]);
  const { toast } = useToast();

  /**
   * Formats a UUID string according to user preferences
   * 
   * @param uuid - Raw UUID string to format
   * @returns Formatted UUID string (uppercase/lowercase, with/without hyphens)
   */
  const formatUuid = useCallback((uuid: string) => {
    let formatted = uuid;
    if (removeHyphens) {
      formatted = formatted.replace(/-/g, '');
    }
    if (uppercase) {
      formatted = formatted.toUpperCase();
    }
    return formatted;
  }, [uppercase, removeHyphens]);

  const generateUuids = useCallback(() => {
    if (quantity < 1 || quantity > 1000) {
      trackError('invalid_quantity', 'Quantity must be between 1 and 1000', 'UUID Generator');
      toast({
        title: 'Invalid Quantity',
        description: 'Please enter a number between 1 and 1000',
        variant: 'destructive',
      });
      return;
    }

    const newUuids = Array.from({ length: quantity }, () => formatUuid(uuidv4()));
    setUuids(newUuids);
    
    // Track successful generation
    trackToolUsage('UUID Generator', 'generate_uuids', {
      quantity: quantity,
      uppercase: uppercase,
      remove_hyphens: removeHyphens
    });
    trackConversion('uuids_generated', 'UUID Generator');
    
    toast({
      title: 'UUIDs Generated',
      description: `Generated ${quantity} UUID${quantity > 1 ? 's' : ''}`,
    });
  }, [quantity, formatUuid, uppercase, removeHyphens, toast]);

  const copyUuid = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    trackToolUsage('UUID Generator', 'copy_single_uuid', {
      uuid_length: uuid.length
    });
    toast({
      title: 'Copied!',
      description: 'UUID copied to clipboard',
    });
  };

  const copyAllUuids = async () => {
    if (uuids.length === 0) return;
    
    await navigator.clipboard.writeText(uuids.join('\n'));
    trackToolUsage('UUID Generator', 'copy_all_uuids', {
      count: uuids.length
    });
    toast({
      title: 'Copied All!',
      description: `${uuids.length} UUIDs copied to clipboard`,
    });
  };

  const downloadUuids = () => {
    if (uuids.length === 0) return;

    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track download
    trackToolUsage('UUID Generator', 'download_uuids', {
      count: uuids.length,
      file_name: a.download
    });
    
    toast({
      title: 'Downloaded!',
      description: 'UUIDs saved to your device',
    });
  };

  const clearUuids = () => {
    setUuids([]);
    trackToolUsage('UUID Generator', 'clear_uuids');
  };

  const regenerateUuids = () => {
    if (uuids.length > 0) {
      generateUuids();
    }
  };

  const handleFillExample = (exampleInput: string) => {
    const newQuantity = parseInt(exampleInput, 10);
    setQuantity(newQuantity);
    trackToolUsage('UUID Generator', 'fill_example', {
      quantity: newQuantity
    });
  };

  return (
    <ToolLayout
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="w-full">
        {/* Configuration */}
        <div className="space-y-6 mb-8 p-3 sm:p-6">
          {/* Quantity */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Quantity (1-1000)
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              className="w-full sm:max-w-xs px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Formatting Options</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-border"
                />
                Uppercase
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={removeHyphens}
                  onChange={(e) => setRemoveHyphens(e.target.checked)}
                  className="rounded border-border"
                />
                Remove Hyphens
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Preview Format</h3>
            <div className="p-3 bg-editor-background border border-border rounded-lg">
              <code className="font-mono text-sm text-muted-foreground break-all">
                {formatUuid('550e8400-e29b-41d4-a716-446655440000')}
              </code>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-6 p-3 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={generateUuids} className="flex items-center gap-2 flex-1 sm:flex-none">
              <Key className="w-4 h-4" />
              Generate UUIDs
            </Button>
          </div>
          
          {uuids.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={regenerateUuids} variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Regenerate</span>
                <span className="sm:hidden">Regenerate</span>
              </Button>
              
              <Button onClick={copyAllUuids} variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy All</span>
                <span className="sm:hidden">Copy All</span>
              </Button>
              
              <Button onClick={downloadUuids} variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">Download</span>
              </Button>
              
              <Button onClick={clearUuids} variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {uuids.length > 0 && (
          <div className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-medium text-foreground">
                Generated UUIDs ({uuids.length})
              </h3>
              <div className="text-sm text-muted-foreground">
                Click any UUID to copy
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xs text-muted-foreground w-8 flex-shrink-0">
                      {index + 1}
                    </span>
                    <code className="font-mono text-sm text-foreground break-all">
                      {uuid}
                    </code>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyUuid(uuid)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mx-4 sm:mx-6">
          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">About UUIDs</h4>
          <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <p>• UUID v4 uses random or pseudo-random numbers</p>
            <p>• 128-bit values with extremely low collision probability</p>
            <p>• Perfect for database primary keys and unique identifiers</p>
            <p>• Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};