import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface ContentBlock {
  id: string;
  key: string;
  type: 'text' | 'image' | 'html';
  content: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export const getContentBlock = async (key: string): Promise<ContentBlock | null> => {
  // Check cache first
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const { data, error } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    console.error('Error fetching content block:', error);
    return null;
  }

  // Update cache
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

export const updateContentBlock = async (
  key: string,
  content: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  const { error } = await supabase
    .from('content_blocks')
    .update({ content, metadata, updated_at: new Date().toISOString() })
    .eq('key', key);

  if (error) {
    console.error('Error updating content block:', error);
    return false;
  }

  // Invalidate cache
  cache.delete(key);
  return true;
};

export const createContentBlock = async (
  key: string,
  type: 'text' | 'image' | 'html',
  content: string,
  metadata?: Record<string, any>
): Promise<ContentBlock | null> => {
  const { data, error } = await supabase
    .from('content_blocks')
    .insert([{ key, type, content, metadata }])
    .select()
    .single();

  if (error) {
    console.error('Error creating content block:', error);
    return null;
  }

  // Update cache
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

export const uploadImage = async (
  file: File,
  path: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from('content-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('content-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Batch fetch content blocks
export const getContentBlocks = async (limit = 50, offset = 0): Promise<ContentBlock[]> => {
  const { data, error } = await supabase
    .from('content_blocks')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching content blocks:', error);
    return [];
  }

  return data;
};