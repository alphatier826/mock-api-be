# Node Auth App

## Setup
1. Install dependencies:
   npm install

2. Start server:
   npm run dev

Server runs on:
http://localhost:3000

## API Endpoints

### Register
POST /api/register
{
  "email": "test@example.com",
  "password": "123456",
  "full_name": "Test User"
}

### Login
POST /api/login
{
  "email": "test@example.com",
  "password": "123456"
}
# mock-api-be
