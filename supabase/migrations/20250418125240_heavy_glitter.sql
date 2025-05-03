/*
  # Fix Content Management System

  1. New Tables
    - `content_blocks`
      - `id` (uuid, primary key)
      - `key` (text, unique identifier for the content block)
      - `type` (text, content type: 'text', 'image', 'html')
      - `content` (text, the actual content)
      - `metadata` (jsonb, additional metadata)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `content_categories`
      - `id` (uuid, primary key)
      - `name` (text, category name)
      - `slug` (text, URL-friendly name)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Add policies for public users to read content
*/

-- Create content_blocks table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'content_blocks') THEN
    CREATE TABLE content_blocks (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      key text UNIQUE NOT NULL,
      type text NOT NULL CHECK (type IN ('text', 'image', 'html')),
      content text NOT NULL,
      metadata jsonb DEFAULT '{}'::jsonb,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create content_categories table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'content_categories') THEN
    CREATE TABLE content_categories (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      slug text UNIQUE NOT NULL,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_tables 
    WHERE tablename = 'content_blocks' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM pg_tables 
    WHERE tablename = 'content_categories' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create or replace policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read access" ON content_blocks;
  DROP POLICY IF EXISTS "Allow authenticated users full access" ON content_blocks;
  DROP POLICY IF EXISTS "Allow public read access to categories" ON content_categories;
  DROP POLICY IF EXISTS "Allow authenticated users full access to categories" ON content_categories;

  -- Create new policies
  CREATE POLICY "Allow public read access"
    ON content_blocks
    FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow authenticated users full access"
    ON content_blocks
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Allow public read access to categories"
    ON content_categories
    FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow authenticated users full access to categories"
    ON content_categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
END $$;

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.triggers 
    WHERE trigger_name = 'update_content_blocks_updated_at'
  ) THEN
    CREATE TRIGGER update_content_blocks_updated_at
      BEFORE UPDATE ON content_blocks
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;