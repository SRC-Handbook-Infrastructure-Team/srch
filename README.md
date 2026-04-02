# srch
The repository for the Socially Responsible Computing Curriculum Handbook

# Project setup
1. Clone the repository! Navigate to the Code tab of the repo and copy the URL to clone.
For example to clone using HTTPS, run
```git clone https://github.com/SRC-Handbook-Infrastructure-Team/new-srch.git``` in the terminal.

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

Because this project now uses a backend API, production deploy has two parts:

1. Frontend static files (`website/dist`) deployed to `/web/cs/web/sites/srch`.
2. Backend Node server deployed and running as a long-lived process.

## Frontend deploy

Build frontend with a production API URL:

```bash
# from repo root
./deploy.sh <your_username> https://srch.cs.brown.edu

# or equivalently
npm run deploy -- <your_username> https://srch.cs.brown.edu

# manual frontend deploy steps:
VITE_API_BASE_URL=https://srch.cs.brown.edu npm run --workspace=website build

scp -r website/dist/* <your_username>@ssh.cs.brown.edu:/web/cs/web/sites/srch/

ssh <your_username>@ssh.cs.brown.edu
cd /web/cs/web/sites/srch
chgrp -R cs-responsible .
chmod 644 index.html
chmod -R 755 assets
exit
```

## Backend deploy

Copy backend code to your CS account and start it:

```bash
# from repo root
scp -r server <your_username>@ssh.cs.brown.edu:~/srch-server

ssh <your_username>@ssh.cs.brown.edu
cd ~/srch-server
npm ci --omit=dev
npm run build-db
ALLOWED_ORIGIN=https://srch.cs.brown.edu PORT=3001 nohup npm start > server.log 2>&1 &
```

Verify backend health:

```bash
curl http://localhost:3001/health
```