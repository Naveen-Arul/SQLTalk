# SQLTalk - AI-Powered Database Analytics

A full-stack application that allows users to query databases using natural language, with the AI generating SQL queries and returning results with visualizations.

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
   - `VITE_API_BASE_URL`: URL of your deployed backend (e.g., `https://your-app.onrender.com`)
4. The build command will automatically use the `vercel.json` configuration

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=your_postgresql_connection_string
AI_KEY=your_groq_api_key
PORT=5000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000  # Change to your backend URL in production
```

## Security Features

- SQL injection prevention
- Query validation and sanitization
- Restricted table access (only orders, customers, products)
- Read-only operations (no INSERT, UPDATE, DELETE)
- UNION query blocking
- System table access prevention

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request