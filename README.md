# GetPlaced – Job Portal Web App

A full-stack job portal application built using the MERN Stack. The platform supports separate authentication for **Recruiters** and **Students**, allowing recruiters to post jobs and manage applicants, while students can apply and receive real-time email updates upon selection or rejection.

## Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email Notifications)

## Features

- Separate login/signup for Recruiters and Students
- Recruiters can post jobs and view applicants
- Students can view and apply to jobs
- JWT-based secure user authentication
- Real-time email notifications on selection or rejection
- Role-based dashboard views
- Persistent data stored in MongoDB

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
git clone https://github.com/IshaanSammi/Chat.git  
cd Chat

### 2. Install Dependencies

Install backend dependencies:
cd backend  
npm install

Install frontend dependencies:
cd ../frontend  
npm install

### 3. Setup Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

### 4. Start the Application

Start the backend server:
cd backend  
npm run dev

Start the frontend application in a separate terminal:
cd frontend  
npm run dev

The application will be running on:  
- Frontend: http://localhost:5173 
- Backend: http://localhost:3000





