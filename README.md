# Field Supervision Survey Management System

## Prerequisites
- **Node.js** (v20+)
- **Docker & Docker Compose** (Optional but highly recommended)
- **MongoDB** (Required only if running locally without Docker)

---

## Method 1: Running with Docker (Recommended)
This method automatically spins up the Next.js frontend, Express backend, and a local MongoDB instance in isolated containers.

1. Ensure **Docker Desktop** is open and running on your machine.
2. Open a terminal in the root directory of the project (`Survey App`).
3. Run the following command to build and start all services:
   ```bash
   docker-compose up --build
   ```
4. Access the applications in your browser:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api/v1/health

To stop the containers, press `Ctrl+C` in the terminal, or run:
```bash
docker-compose down
```

---

## Method 2: Running Locally (Manual Setup)

### 1. Setup Database
Ensure you have MongoDB running locally on port `27017`. If you are using MongoDB Atlas, open `backend/.env` and replace the `MONGO_URI` with your connection string.

### 2. Run the Backend (Express API)
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
```
Start the development server:
```bash
npm run dev
```
*The backend should now be running on `http://localhost:5000`.*

### 3. Run the Frontend (Next.js)
Open a **new** terminal window and navigate to the `frontend` folder:
```bash
cd frontend
```
Start the Next.js development server:
```bash
npm run dev
```
*The frontend should now be running on `http://localhost:3000`.*

---

## Default Environment Variables
*(These are already configured in `backend/.env` for local development)*
- `PORT=5000`
- `MONGO_URI=mongodb://localhost:27017/field-supervision` (Use `mongodb://mongo:27017/field-supervision` if using Docker)
- `CORS_ORIGIN=http://localhost:3000`
