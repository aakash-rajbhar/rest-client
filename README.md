# REST Client with Request History (Next.js + MikroORM)

A lightweight REST client application (similar to Postman) built with **Next.js** and **MikroORM**, allowing you to send HTTP requests (GET, POST, PUT, DELETE) and save request history.  

The app supports **paginated request history**, **live updates**, and **error handling**, making it easy to test APIs while keeping track of your requests.

---

## Features

- Send HTTP requests: **GET, POST, PUT, DELETE**
- Display API responses **without page reloads**
- Store request history using **MikroORM + SQLite**
- Paginated and dynamically updated **request history**
- Handle network errors and invalid URLs gracefully
- Simple, modern, and responsive UI

---

## Tech Stack

- **Frontend**: Next.js 15 (App Directory), Tailwind CSS  
- **Backend**: Next.js API routes  
- **Database**: SQLite (via MikroORM)  
- **ORM**: MikroORM (entities, migrations, schema generation)  

---

## Project Structure

├─ app/
│ ├─ api/
│ │ ├─ request/route.ts # Handles sending requests
│ │ └─ history/route.ts # Fetches paginated request history
│ ├─ page.tsx # Home page with RequestForm + History
├─ components/
│ ├─ RequestForm.tsx # REST client form
│ └─ History.tsx # Paginated request history
├─ lib/
│ ├─ entities/
│ │ └─ RequestLog.ts # MikroORM entity for request logs
│ └─ mikroorm.ts # MikroORM initialization
├─ package.json
└─ tsconfig.json / jsconfig.json



---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repo-url>
cd <project-folder>

npm install

npm run dev

```


The app will be available at: http://localhost:3000

Database

Uses SQLite (requests.db) automatically created in the project root.

The table request_log is created by MikroORM.

You can inspect it using a GUI like DB Browser for SQLite
 or CLI:

 ```bash
sqlite3 requests.db
.tables
SELECT * FROM request_log;

```

## Usage

Send a Request

Choose HTTP method (GET, POST, PUT, DELETE)

Enter the request URL

Add JSON body for POST/PUT requests (optional for GET/DELETE)

Click Send

Response will appear immediately below the form

Request History

Shows last requests in paginated view

Automatically updates after sending a request

Failed requests (invalid URL, network errors) show status 0 and display the error

Example URLs for testing

GET https://jsonplaceholder.typicode.com/posts

POST https://jsonplaceholder.typicode.com/posts with body:
{
  "title": "foo",
  "body": "bar",
  "userId": 1
}


PUT https://jsonplaceholder.typicode.com/posts/1 with body:
{
  "id": 1,
  "title": "updated",
  "body": "updated body",
  "userId": 1
}

DELETE https://jsonplaceholder.typicode.com/posts/1
Error Handling

Network errors or invalid URLs are caught on the server and returned to the client.

Failed requests are saved in history with status: 0.

Example error response:
{
  "error": "Request failed: getaddrinfo ENOTFOUND invalid-url.com"
}

## Features for Large Datasets

- Pagination: Only 10 requests are loaded per page

- Dynamic refresh: History updates immediately when new requests are sent

- Lazy fetching: Only fetches visible history page, not entire table

## screenshot