import React, { useState, useEffect } from 'react';
import { Plus, Search, FolderOpen, Loader2 } from 'lucide-react';
import ContentEditor from '../components/ContentEditor';
import { supabase, ContentBlock, getContentBlocks } from '../config/supabase';
import ErrorBoundary from '../components/ErrorBoundary';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 20;

const ContentManager: React.FC = () => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadContentBlocks();
    
    // Cleanup subscription on unmount
    return () => {
      setContentBlocks([]);
      setOffset(0);
    };
  }, [debouncedSearch, selectedCategory]);

  const loadContentBlocks = async (loadMore = false) => {
    setIsLoading(true);
    try {
      const newOffset = loadMore ? offset + ITEMS_PER_PAGE : 0;
      const blocks = await getContentBlocks(ITEMS_PER_PAGE, newOffset);
      
      setContentBlocks(prev => loadMore ? [...prev, ...blocks] : blocks);
      setHasMore(blocks.length === ITEMS_PER_PAGE);
      setOffset(newOffset);
    } catch (error) {
      console.error('Error loading content blocks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlocks = contentBlocks.filter(block => {
    const matchesSearch = block.key.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = !selectedCategory || block.metadata?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif text-gray-900">Content Manager</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              <Plus className="w-5 h-5" />
              <span>New Content Block</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search content blocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Categories</option>
                <option value="home">Home Page</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
              </select>
              <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Content Blocks */}
          <ErrorBoundary>
            <div className="grid grid-cols-1 gap-6">
              {isLoading && contentBlocks.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
              ) : (
                <>
                  {filteredBlocks.map((block) => (
                    <div key={block.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{block.key}</h3>
                        <p className="text-sm text-gray-500">
                          Last updated: {new Date(block.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <ContentEditor
                        contentKey={block.key}
                        type={block.type}
                        defaultContent={block.content}
                      />
                    </div>
                  ))}

                  {hasMore && (
                    <button
                      onClick={() => loadContentBlocks(true)}
                      disabled={isLoading}
                      className="w-full py-3 text-center text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        'Load More'
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;