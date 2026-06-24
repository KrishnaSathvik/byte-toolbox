import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    setUuids([formatUuid(uuidv4())]);
    // Generate one UUID on initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="w-full tool-workspace">
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-foreground">UUID v4 Generator</h3>
          <span className="dev-badge">UUID v4</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Quantity (1-1000)
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Format</label>
            <div className="flex flex-wrap gap-3 pt-1">
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
                No hyphens
              </label>
            </div>
            <code className="block text-xs font-mono text-muted-foreground mt-1">
              Preview: {formatUuid('550e8400-e29b-41d4-a716-446655440000')}
            </code>
          </div>

          <div className="flex items-end">
            <Button onClick={generateUuids} className="flex items-center gap-2 w-full sm:w-auto">
              <Key className="w-4 h-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="p-4 sm:p-5 border-b border-border">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="font-medium text-foreground text-sm">
              Generated UUID{uuids.length > 1 ? 's' : ''} ({uuids.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={copyAllUuids} variant="outline" size="sm" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy all
              </Button>
              <Button onClick={regenerateUuids} variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
              {uuids.length > 1 && (
                <>
                  <Button onClick={downloadUuids} variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button onClick={clearUuids} variant="ghost" size="sm" className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="dev-result-card max-h-80 overflow-y-auto space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={`${uuid}-${index}`}
                className="group flex items-center justify-between gap-3 p-2 rounded border border-border/60 hover:bg-secondary/40 transition-colors"
              >
                <code className="font-mono text-sm text-foreground break-all flex-1">{uuid}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyUuid(uuid)}
                  className="shrink-0 opacity-70 group-hover:opacity-100"
                  aria-label={`Copy UUID ${index + 1}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <h4 className="font-medium text-foreground text-sm mb-2">About UUID v4</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Random 128-bit identifiers with extremely low collision probability.</p>
          <p>Common for API request IDs, test data, and database primary keys.</p>
          <p className="font-mono text-xs">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
  );
};