import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, RefreshCw, Key, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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

export const UuidGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);
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
      toast({
        title: 'Invalid Quantity',
        description: 'Please enter a number between 1 and 1000',
        variant: 'destructive',
      });
      return;
    }

    const newUuids = Array.from({ length: quantity }, () => formatUuid(uuidv4()));
    setUuids(newUuids);
    
    toast({
      title: 'UUIDs Generated',
      description: `Generated ${quantity} UUID${quantity > 1 ? 's' : ''}`,
    });
  }, [quantity, formatUuid, toast]);

  const copyUuid = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    toast({
      title: 'Copied!',
      description: 'UUID copied to clipboard',
    });
  };

  const copyAllUuids = async () => {
    if (uuids.length === 0) return;
    
    await navigator.clipboard.writeText(uuids.join('\n'));
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
    
    toast({
      title: 'Downloaded!',
      description: 'UUIDs saved to your device',
    });
  };

  const clearUuids = () => {
    setUuids([]);
  };

  const regenerateUuids = () => {
    if (uuids.length > 0) {
      generateUuids();
    }
  };

  const handleFillExample = (exampleInput: string) => {
    setQuantity(parseInt(exampleInput, 10));
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate unique identifiers in bulk with customizable options. Create UUID v4 strings for databases, APIs, and applications with professional formatting options."
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="p-6">
        {/* Configuration */}
        <div className="space-y-6 mb-8">
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
              className="w-full max-w-xs px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Formatting Options</h3>
            <div className="flex flex-wrap gap-4">
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
              <code className="font-mono text-sm text-muted-foreground">
                {formatUuid('550e8400-e29b-41d4-a716-446655440000')}
              </code>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={generateUuids} className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Generate UUIDs
          </Button>
          
          {uuids.length > 0 && (
            <>
              <Button onClick={regenerateUuids} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
              
              <Button onClick={copyAllUuids} variant="outline" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy All
              </Button>
              
              <Button onClick={downloadUuids} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              
              <Button onClick={clearUuids} variant="outline" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </>
          )}
        </div>

        {/* Results */}
        {uuids.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
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
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    <code className="font-mono text-sm text-foreground">
                      {uuid}
                    </code>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyUuid(uuid)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-lg">
          <h4 className="font-medium text-info mb-2">About UUIDs</h4>
          <div className="text-sm text-info/80 space-y-1">
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