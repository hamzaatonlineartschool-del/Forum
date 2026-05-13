# Developer handoff — OAS Forum (`oas-forum`)

## Preferred: clone from Git

Remote: **https://github.com/hamzaatonlineartschool-del/Forum.git**  
Branch: **main**

```bash
git clone https://github.com/hamzaatonlineartschool-del/Forum.git
cd Forum
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and set values as needed:

```bash
cp .env.example .env
```

`NEXT_PUBLIC_MAIN_SITE_ORIGIN` is optional; see `.env.example`.

## Node.js

The repo includes `.nvmrc` (Node **20**). With [nvm](https://github.com/nvm-sh/nvm): run `nvm use`. Otherwise use Node 20 or a current LTS close to it.

## ZIP archive

If you received a ZIP instead of Git history: unzip, then run `npm install` and `npm run dev` in the project folder. Do not commit real secrets; keep production keys out of archives and use a secure channel when sharing.

## Sharing the bundle

For large files, prefer a cloud link (Drive, Dropbox, WeTransfer, etc.) instead of email attachments.
