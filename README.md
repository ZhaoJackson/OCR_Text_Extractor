# OCR Text Extractor

A simple web app that extracts text from uploaded images. It connects a React + Ant Design frontend to either:
- an n8n cloud workflow (recommended), or
- a lightweight Node.js + Express backend API (optional for local/offline flows).

---

## Project Structure

```
text-extract-app/
├── backend/
│   ├── index.js                 # Express API (optional)
│   └── package.json
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js               # Upload UI; calls n8n webhook by default
│       ├── App.css
│       └── index.js
├── n8n text extract.json        # n8n workflow export
├── .gitignore
└── README.md
```

---

## How It Works (Architecture)

- Frontend (`frontend/src/App.js`) lets users select an image and sends it to a processing endpoint.
- By default, the endpoint is an n8n Cloud webhook. The workflow:
  - Receives the uploaded file in a webhook node
  - Converts file to inline data
  - Calls Gemini via HTTP request to extract text
  - Optionally appends results into Google Sheets
  - Responds to the webhook with extracted text
- Optionally, a local Express backend (`backend/index.js`) can accept uploads and return a mock or custom result. This is useful for offline/local testing.

Live demo: https://text-extract-app.vercel.app/

---

## n8n Integration

- File: `n8n text extract.json` (import this into your n8n instance)
- Webhook path: defined inside the workflow (e.g. `.../webhook/3b9855...`)
- Expected request:
  - Method: POST
  - Body: multipart/form-data with the image file
- Response shape: The frontend expects `res.data.candidates[0].content.parts[0].text` to contain the extracted text when using the Gemini HTTP node from the provided workflow.

Security tip: set your n8n workflow to production URL and consider adding authentication if exposing publicly.

---

## Local Development

### Frontend

```bash
cd frontend
npm install
npm start
```
Runs at: http://localhost:3000

The default `App.js` posts directly to your n8n cloud webhook URL. You do not need the backend for this path.

### Backend (optional)

```bash
cd backend
npm install
# You can pick a free port if 5000 is occupied
PORT=5051 npm start
```
Runs at: http://localhost:PORT (defaults to 5000; uses `process.env.PORT` if set).

Current upload endpoint in `backend/index.js`:
```
POST /api/upload  (multipart/form-data)
  field name: image
  returns: { success: true, data: { text: "..." } }
```

If you switch the frontend to call the local backend, update `frontend/src/App.js` to:
1) use `formData.append('image', file)`
2) post to `http://localhost:<PORT>/api/upload`
3) read `res.data.data.text` for the result

---

## Deployment (Vercel)

Frontend (React) is designed to deploy on Vercel:
- Connect the GitHub repo in Vercel → Add New Project → select this repo
- Root Directory: `frontend/`
- Build settings: auto-detected (Create React App / Vite)
- Environment Variables (optional): add any needed runtime config
- After deploy, Vercel provides a public URL

If you want to deploy backend too, consider:
- Vercel Serverless Functions (migrate Express routes) or
- Dedicated hosts (Render, Railway, Fly.io, etc.)

Using n8n cloud means you typically only deploy the frontend to Vercel.

---

## Configuration

- Frontend endpoint: edit `frontend/src/App.js` to point to your n8n webhook or local API
- Backend port: set `PORT` env var (e.g., `PORT=5051`)
- n8n: import the provided workflow, set API keys and Google credentials inside n8n

---

## Troubleshooting

- Port 5000 in use on macOS:
  - Disable AirPlay Receiver in System Settings → General → AirDrop & Handoff, or
  - Use another port: `PORT=5051 npm start`
- CORS errors:
  - Backend enables CORS by default
  - When calling n8n directly from the browser, ensure the n8n webhook allows cross-origin requests
- n8n response shape mismatch:
  - The frontend expects Gemini’s `candidates[0].content.parts[0].text`. Adjust mapping or frontend parsing if your workflow differs.

---

## License

Created by Zichen Zhao — for demo, learning, and personal use.