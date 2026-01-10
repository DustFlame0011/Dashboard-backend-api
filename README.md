# Dashboard Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

This repository contains the backend service for the dashboard application.  
Built with Node.js, Express, and MongoDB, following a clean and scalable architecture.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- RESTful API

## Project Structure

```
src/
├── routes/ # API routes
├── controllers/ # Business logic
├── models/ # MongoDB schemas
├── config/ # App & database configuration
└── index.js
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables

Create a ```.env``` file :
```bash
PORT=5000
MONGODB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloud_name
API_KEY=your_API_key
API_SECRET=your_API_SECRET
```

### 3. Run the server

```
npm run dev
```

### Notes

Sensitive data is managed via environment variables

```.env``` files are excluded from version control for security reasons

---

```md
This backend is designed to work with the dashboard frontend application.
