# Kelasku - CBT Quiz Application

Kelasku is a web-based Computer Based Test (CBT) application designed for educational quizzes. It allows users to take quizzes, track their progress, and review their results with detailed explanations.

## Development Progress

### Backend Development

- [x] Database schema design and migrations
- [x] User authentication system
- [x] Quiz and Question models
- [x] Submission and Answer tracking
- [x] RESTful API endpoints
- [x] Error handling middleware
- [x] Data seeding for development
- [x] API optimization for quiz review

### Frontend Development

- [x] Project setup with React and Vite
- [x] Redux store configuration
- [x] Authentication pages (Login/Register) - **Integrated with backend**
- [x] Home page with quiz listing - **Using dummy data for UI**
- [x] Quiz interface with question navigation - **Using dummy data for UI**
- [x] Progress tracking component - **Using dummy data for UI**
- [x] Result page with score display - **Using dummy data for UI**
- [x] Question review with explanations - **Using dummy data for UI**
- [x] Responsive design implementation

## Technology Stack

**Backend:**

- Framework: Node.js with Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: JWT (JSON Web Tokens)
- Password Security: bcrypt hashing

**Frontend:**

- Framework: React 19 with Vite
- Styling: TailwindCSS 4
- Routing: React Router 7
- State Management: Redux Toolkit
- HTTP Client: Axios

### Integration & Testing

- [x] API integration for authentication (Login/Register)
- [x] Authentication flow with JWT tokens
- [x] User session management
- [x] Error handling and validation
- [ ] Full quiz API integration (currently using dummy data)
- [ ] Submission and scoring integration
- [ ] Mobile responsiveness testing

## Current Integration Status

### Fully Integrated Features

- **User Authentication**: Complete integration between frontend and backend
  - Registration with validation
  - Login with JWT token management
  - Protected route middleware
  - Session persistence

### UI Development with Dummy Data

- **Quiz Interface**: Frontend uses static data for UI development
  - Quiz listing page with sample quizzes
  - Question navigation and answer selection
  - Progress tracking and timer functionality
  - Result display and review pages

### Pending Integration

- **Quiz Management**: Backend APIs ready, frontend integration pending
- **Submission System**: Database models complete, API integration needed
- **Score Calculation**: Backend logic implemented, frontend integration pending
- **Quiz History**: Backend endpoints available, frontend connection needed

### Documentation

- [x] API documentation
- [x] Database schema documentation
- [x] Setup and installation guide

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the app locally:

```bash
npm run dev
```

3. Open in your browser: Visit `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
kelasku/
├── server/                 # Backend API
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth & error handling
│   └── migrations/        # Database migrations
└── client/                # Frontend React app
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── store/         # Redux store
    │   └── utils/         # Helper functions
    └── public/            # Static assets
```
