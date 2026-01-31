# Schema Plan - GrantMaster

## Overview
GrantMaster is a grant management system for non-profits. The database needs to support grant tracking, application pipelines, document storage, and analytics.

## Tables

### 1. `profiles`
   - **Purpose**: Stores user profile information, linked to Supabase Auth users.
   - **Columns**:
     - `id` (uuid, PK) - References `auth.users.id`
     - `email` (text) - User's email address
     - `full_name` (text) - User's display name
     - `avatar_url` (text) - URL to profile image
     - `organization_name` (text, nullable) - Name of the non-profit organization
     - `role` (text) - User role (e.g., 'admin', 'member')
     - `created_at` (timestamptz) - Creation timestamp
     - `updated_at` (timestamptz) - Last update timestamp

### 2. `grant_opportunities`
   - **Purpose**: Stores details about potential grants (the "database" of opportunities).
   - **Columns**:
     - `id` (uuid, PK)
     - `title` (text) - Name of the grant
     - `funder_name` (text) - Organization offering the grant
     - `description` (text) - Details about the grant
     - `url` (text) - Link to the official grant page
     - `amount_min` (numeric, nullable) - Minimum funding amount
     - `amount_max` (numeric, nullable) - Maximum funding amount
     - `deadline` (timestamptz) - Submission deadline
     - `category` (text) - e.g., 'Education', 'Health', 'Environment'
     - `match_probability` (integer, nullable) - Estimated probability of success (0-100)
     - `created_by` (uuid) - References `profiles.id`
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

### 3. `applications`
   - **Purpose**: Tracks the specific application process for a grant opportunity (Kanban items).
   - **Columns**:
     - `id` (uuid, PK)
     - `opportunity_id` (uuid) - References `grant_opportunities.id`
     - `assigned_to` (uuid, nullable) - References `profiles.id` (Lead applicant)
     - `status` (text) - Kanban status: 'identified', 'researching', 'drafting', 'review', 'submitted', 'approved', 'rejected'
     - `priority` (text) - 'low', 'medium', 'high'
     - `submission_date` (timestamptz, nullable) - Actual date submitted
     - `outcome_date` (timestamptz, nullable) - Date decision was received
     - `awarded_amount` (numeric, nullable) - Amount actually funded
     - `notes` (text, nullable) - General notes
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

### 4. `documents`
   - **Purpose**: Stores metadata for files associated with applications (e.g., proposals, budgets).
   - **Columns**:
     - `id` (uuid, PK)
     - `application_id` (uuid) - References `applications.id`
     - `uploader_id` (uuid) - References `profiles.id`
     - `name` (text) - Display name of the file
     - `file_path` (text) - Path in Supabase Storage
     - `file_type` (text) - MIME type
     - `size_bytes` (bigint) - File size
     - `version` (integer) - Version tracking
     - `created_at` (timestamptz)

### 5. `activity_logs`
   - **Purpose**: Audit trail for analytics and history.
   - **Columns**:
     - `id` (uuid, PK)
     - `user_id` (uuid) - References `profiles.id`
     - `entity_type` (text) - 'application', 'grant', 'document'
     - `entity_id` (uuid) - ID of the affected entity
     - `action` (text) - 'created', 'updated', 'moved', 'deleted'
     - `details` (jsonb) - Snapshot of changes (e.g., status change from 'drafting' to 'review')
     - `created_at` (timestamptz)

## Relationships

- `profiles` 1:N `grant_opportunities` (creator)
- `profiles` 1:N `applications` (assignee)
- `grant_opportunities` 1:N `applications` (Usually 1:1, but allows re-applying next year)
- `applications` 1:N `documents`
- `profiles` 1:N `documents` (uploader)
- `profiles` 1:N `activity_logs`

## RLS Policies (Draft)

- **General**: Users can view all data within their organization (if org logic implemented later). For now, assume single-tenant or open for authenticated users for demo purposes.
- **Profiles**: Users can update their own profile.
- **Grants/Applications**: Authenticated users can CRUD.

## Indexes

- `applications(status)` - For Kanban board filtering.
- `applications(opportunity_id)` - For joining.
- `grant_opportunities(deadline)` - For upcoming deadlines.
