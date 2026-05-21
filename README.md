# File Upload API

A Node.js API for uploading files with Multer and storing file metadata in MongoDB.

## Features

- Upload single or multiple files
- Store files locally on disk
- Save file metadata in MongoDB
- List uploaded files
- Get file details by ID
- Download a file by ID
- Delete a file by ID
- Configurable file type and size limits
- Optional CORS support for browser clients

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose
- Multer
- dotenv
- cors

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy `.env.example` to `.env` and update the values:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/file-upload-api
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_MIME_TYPES=image/png,image/jpeg,image/webp,application/pdf
```

### 3. Start MongoDB

Make sure MongoDB is running locally or update `MONGODB_URI` to point to your database.

### 4. Run the API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API endpoints

### Health check

`GET /health`

Response:

```json
{ "status": "ok" }
```

### Upload files

`POST /api/files/upload`

- Content-Type: `multipart/form-data`
- Field name: any file field name accepted
- Supports one or multiple files

Response includes saved metadata for each uploaded file.

### List files

`GET /api/files`

Returns all uploaded files sorted by newest first.

### Get file details

`GET /api/files/:id`

Returns metadata for one file.

### Download file

`GET /api/files/:id/download`

Downloads the physical file from disk.

### Delete file

`DELETE /api/files/:id`

Deletes the file from disk and removes its metadata from MongoDB.

## Environment variables

- `PORT` - server port
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - allowed browser origin(s), comma-separated
- `UPLOAD_DIR` - folder where uploaded files are stored
- `MAX_FILE_SIZE` - upload size limit in bytes
- `ALLOWED_MIME_TYPES` - comma-separated list of allowed MIME types

## Notes

- `uploads/` is ignored by git.
- CORS is optional, but recommended if a frontend app will call this API from a different origin.
- File type restrictions are enforced by MIME type.
- If `ALLOWED_MIME_TYPES` is empty, all MIME types are allowed.

## Project structure

```text
src/
  app.js
  server.js
  config/
    db.js
  controllers/
    filesController.js
  middleware/
    asyncHandler.js
    errorHandler.js
  models/
    File.js
  routes/
    files.js
  utils/
    fileNaming.js
    multer.js
uploads/
