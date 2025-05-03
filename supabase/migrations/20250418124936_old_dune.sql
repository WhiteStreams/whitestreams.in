/*
  # Content Management System

  1. New Tables
    - `content_blocks`
      - `id` (uuid, primary key)
      - `key` (text, unique identifier for the content block)
      - `type` (text, content type: 'text', 'image', 'html')
      - `content` (text, the actual content)
      - `metadata` (jsonb, additional metadata like image dimensions, alt text)
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

  3. Changes
    - Initial schema creation
*/

-- Create content_blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'image', 'html')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_categories table
CREATE TABLE IF NOT EXISTS content_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;

-- Policies for content_blocks
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

-- Policies for content_categories
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

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating timestamp
CREATE TRIGGER update_content_blocks_updated_at
  BEFORE UPDATE ON content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();