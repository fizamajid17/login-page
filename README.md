# User Portal

A full-stack web application where users can register, log in, and manage their personal details. Includes a separate admin panel to view all registered users.

---

## Features

- User registration with name, age, college, phone, Aadhaar, and username
- Secure login using username and password
- Each user can view and edit their own details
- Admin panel to view all registered users
- Password hashing using bcrypt
- Session-based authentication
- Input validation (phone: 10 digits, Aadhaar: 12 digits)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | SQLite (better-sqlite3) |
| Auth | bcryptjs, express-session |

---

## Project Structure

```
user-portal/
├── public/
│   ├── index.html       # Login page
│   ├── register.html    # Registration page
│   ├── dashboard.html   # User dashboard
│   ├── admin.html       # Admin panel
│   └── style.css        # Styling
├── database.js          # Database setup
├── server.js            # Backend server & routes
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/user-portal.git

# Navigate into project
cd user-portal

# Install dependencies
npm install

# Start the server
node server.js
```

Open browser → `http://localhost:3000`

---

## Usage

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| User | (register first) | (your password) |

---

## Author

**Fiza Majid**