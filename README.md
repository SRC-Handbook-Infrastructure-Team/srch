# srch

The repository for the Socially Responsible Computing Curriculum Handbook

# Project setup

1. Clone the repository! Navigate to the Code tab of the repo and copy the URL to clone.
   For example to clone using HTTPS, run
   `git clone https://github.com/SRC-Handbook-Infrastructure-Team/new-srch.git` in the terminal.

2. Run `cd srch-s25` to move into the repository root

3. Run `npm install` once from the repository root to install all workspace dependencies.

4. Use these commands from the repository root during development:
   - `npm run dev` to start backend + frontend
   - `npm run server` to start backend only
   - `npm run website` to start frontend only

5. When you are finished with your changes, add + commit + push them to your branch.

6. When you are ready to deploy, merge your branch into main.

7. Switch to the main branch then pull your merged branch.

8. Deploy both frontend and backend (see the production deployment section below).

9. You should automatically be able to view the deployed changes in our GitHub pages site: https://src-handbook-infrastructure-team.github.io/srch

# Production Deployment

Production content is served directly from frontend-bundled markdown files.
There is no backend content API dependency for website pages.

## Frontend deploy

Run the unified deploy script from repo root:

```bash
./deploy.sh <your_username>
```

What this script does:

1. Builds and uploads frontend assets to `/web/cs/web/sites/srch`.
2. Applies group ownership and permissions recursively (`775` directories, `664` files).
3. Verifies `https://srch.cs.brown.edu/search-index.json` is publicly readable.
