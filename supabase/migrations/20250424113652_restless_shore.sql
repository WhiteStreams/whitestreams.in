/*
  # Contact Form Submissions Schema

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `submission_id` (text, unique identifier for the submission)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `interest` (text)
      - `message` (text)
      - `metadata` (jsonb, additional data like IP, user agent)
      - `created_at` (timestamp)
      - `status` (text, submission status)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to view submissions
    - Add policy for inserting new submissions
    - Add policy for public read access to specific fields

  3. Notes
    - Includes GDPR compliance fields
    - Stores submission metadata
    - Tracks email delivery status
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text NOT NULL,
  message text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  email_sent boolean DEFAULT false,
  confirmation_sent boolean DEFAULT false,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processed', 'error'))
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for inserting new submissions
CREATE POLICY "Allow public to insert submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for authenticated users to view submissions
CREATE POLICY "Allow authenticated users to view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX contact_submissions_email_idx ON contact_submissions(email);
CREATE INDEX contact_submissions_created_at_idx ON contact_submissions(created_at);