# OCR Text Extractor

A simple web application that extracts text from uploaded images using Optical Character Recognition (OCR). Built with a Node.js + Express backend and a React + Ant Design frontend.

---

## Project Structure

```
ocr_text/
├── backend/ 
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/   
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── README.md
```
---

## Features

- Upload image files via browser
- Send image to backend and n8n webhook for processing
- Display extracted text to the user
- Responsive and styled UI with Ant Design

---

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

Runs on: http://localhost:5000

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```
Runs on: http://localhost:3000

---

## License

- Created by Zichen Zhao — for demo, learning, and personal use.