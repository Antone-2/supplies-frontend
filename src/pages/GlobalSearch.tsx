import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('products');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/search?type=${tab}&q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setResults(data.results || []);
      } else {
        toast({ title: 'Error', description: data.message, variant: 'destructive' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white rounded shadow">
        <Tabs value={tab} onValueChange={setTab} className="mb-4" aria-label="Global Search Tabs">
          <TabsList role="tablist">
            <TabsTrigger value="products" role="tab" aria-selected={tab === 'products'} tabIndex={0}>Products</TabsTrigger>
            <TabsTrigger value="orders" role="tab" aria-selected={tab === 'orders'} tabIndex={0}>Orders</TabsTrigger>
            <TabsTrigger value="users" role="tab" aria-selected={tab === 'users'} tabIndex={0}>Users</TabsTrigger>
          </TabsList>
        </Tabs>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4" aria-label="Search Form">
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${tab}...`} aria-label={`Search ${tab}`} />
          <Button type="submit" disabled={loading} aria-label="Search Button">{loading ? 'Searching...' : 'Search'}</Button>
        </form>
        <div role="region" aria-live="polite">
          {results.length === 0 && !loading && <p className="text-muted-foreground">No results found.</p>}
          {results.map((item, idx) => (
            <div key={idx} className="border-b py-2" tabIndex={0} aria-label={`Result ${idx + 1}`}>
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
