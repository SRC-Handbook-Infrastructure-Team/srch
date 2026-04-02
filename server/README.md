# SRCH Back-end Server

Node.js/Express server that provides a REST API for the SRCH Handbook website, backed by a SQLite database.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the database from the markdown files:

   ```bash
   npm run build-db
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server listens on port `3001` by default and allows cross-origin requests from `http://localhost:5173` (the Vite dev server). Both settings can be configured via environment variables:

| Variable         | Default                  | Description                          |
|------------------|--------------------------|--------------------------------------|
| `PORT`           | `3001`                   | Port the server listens on           |
| `ALLOWED_ORIGIN` | `http://localhost:5173`  | Allowed CORS origin for the API      |

## API Endpoints

### Content

| Method | Path                                          | Description                          |
|--------|-----------------------------------------------|--------------------------------------|
| GET    | `/api/sections`                               | List all sections                    |
| GET    | `/api/sections/:sectionId`                    | Get section content                  |
| GET    | `/api/sections/:sectionId/subsections`        | List subsections for a section       |
| GET    | `/api/sections/:sectionId/:subsectionId`      | Get subsection content               |

### Search

| Method | Path                        | Description                                      |
|--------|-----------------------------|--------------------------------------------------|
| GET    | `/api/search?q=<query>`     | Full-text search across all content              |
| GET    | `/api/search?q=<query>&limit=<n>` | Search with result limit (max 100)         |

### Health

| Method | Path       | Description   |
|--------|------------|---------------|
| GET    | `/health`  | Health check  |

## Pre-built Search Index

To reduce browser load time, you can pre-build a search index JSON file for the front-end:

```bash
# From the srch-website/ directory:
npm run export-index
```

This generates `srch-website/public/search-index.json`. The front-end automatically loads this file when available, falling back to building the index from individual markdown files otherwise.

The index is also regenerated automatically when running `npm run build`.
