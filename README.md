# SQLTalk - AI-Powered Database Analytics

A full-stack application that allows users to query databases using natural language, with the AI generating SQL queries and returning results with visualizations.

## Live Demo

Check out the live application: [https://sql-talk.vercel.app/](https://sql-talk.vercel.app/)

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: React hooks
- **API Communication**: Axios
- **Charts & Visualizations**: Recharts

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **AI Integration**: Groq API for natural language processing
- **Security**: Multi-layered SQL validation

### Data Flow Architecture

```
User Input (Natural Language)
         ↓
Frontend Query Component
         ↓
Backend API (/api/analyze)
         ↓
NLP Service (AI Processing)
         ↓
SQL Generation Service
         ↓
SQL Validation Layer
         ↓
Database Query Execution
         ↓
Results Processing
         ↓
Frontend Visualization
```

## Core Components

### Frontend Components
- **QueryInput**: Handles user input and sends to backend
- **ResultsTable**: Displays query results in tabular format
- **ResultsChart**: Visualizes data with charts
- **SQLDisplay**: Shows the generated SQL query
- **ExportPanel**: Provides export functionality
- **SchemaPanel**: Displays available database schema

### Backend Services
- **NLP Service**: Processes natural language using AI
- **SQL Service**: Generates SQL queries from natural language
- **SQL Validator**: Validates queries for security and syntax
- **Database Service**: Handles PostgreSQL connections

## Security Architecture

The application implements multiple security layers:

1. **AI Prompt Security**: AI is instructed to follow security guidelines
2. **SQL Validation**: Multi-step validation of generated SQL:
   - Only SELECT statements allowed
   - Blocked keywords (INSERT, UPDATE, DELETE, etc.)
   - Disallowed tables validation
   - UNION query prevention
   - Comment pattern detection
   - GROUP BY compliance checking
3. **Database Security**: Connection pooling with environment-based configuration

## Workflow Process

1. **User Input**: User enters a natural language query in the frontend
2. **API Request**: Frontend sends query to `/api/analyze` endpoint
3. **AI Processing**: NLP service processes the query using Groq API
4. **SQL Generation**: AI generates appropriate SQL query based on database schema
5. **Validation**: Multi-layer security validation of the generated SQL
6. **Database Execution**: Validated query is executed against PostgreSQL
7. **Response Processing**: Results are formatted and sent back to frontend
8. **Visualization**: Frontend displays results in table and chart formats

## Features

- Natural language to SQL conversion
- Real-time query results
- Interactive data visualizations
- Export capabilities (CSV, Excel, PDF)
- Secure SQL validation
- User-friendly interface

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, PostgreSQL
- **AI**: Groq API for natural language processing
- **Database**: PostgreSQL

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/analyze` - Analyze natural language query
- `GET /api/data` - Fetch raw data

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect to this GitHub repository
3. Set the environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `AI_KEY`: Groq API key
4. Use the `render.yaml` configuration file for automatic deployment

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect to this GitHub repository
3. Set the environment variables:
   - `VITE_API_BASE_URL`: URL of your deployed backend
4. The build command will automatically use the `vercel.json` configuration