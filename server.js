const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./database');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: 'mysecretkey123',
  resave: false,
  saveUninitialized: false
}));

// ── REGISTER ──
app.post('/register', async (req, res) => {
  const { name, age, college, phone, aadhaar, username, password } = req.body;

    if (!/^\d{10}$/.test(phone))
        return res.json({ success: false, message: 'Phone must be exactly 10 digits' });
     if (!/^\d{12}$/.test(aadhaar))
        return res.json({ success: false, message: 'Aadhaar must be exactly 12 digits' });

  const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (existing) return res.json({ success: false, message: 'Username already taken' });

  const hashed = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (name, age, college, phone, aadhaar, username, password) VALUES (?,?,?,?,?,?,?)')
    .run(name, age, college, phone, aadhaar, username, hashed);

  res.json({ success: true, message: 'Registered successfully!' });
});

// ── LOGIN ──
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    req.session.user = { role: 'admin' };
    return res.json({ success: true, role: 'admin' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) return res.json({ success: false, message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: 'Wrong password' });

  req.session.user = { id: user.id, role: 'user' };
  res.json({ success: true, role: 'user' });
});

// ── GET OWN DATA ──
app.get('/my-data', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'user')
    return res.json({ success: false, message: 'Not logged in' });

  const user = db.prepare('SELECT name, age, college, phone, aadhaar, username FROM users WHERE id = ?')
    .get(req.session.user.id);
  res.json({ success: true, user });
});

// ── ADMIN: ALL USERS ──
app.get('/all-users', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin')
    return res.json({ success: false, message: 'Not admin' });

  const users = db.prepare('SELECT name, age, college, phone, aadhaar, username FROM users').all();
  res.json({ success: true, users });
});

// ── UPDATE USER DATA ──
app.post('/update', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'user')
    return res.json({ success: false, message: 'Not logged in' });
  
  const { name, age, college, phone, aadhaar } = req.body;
  if (!/^\d{10}$/.test(phone))
    return res.json({ success: false, message: 'Phone must be exactly 10 digits' });
  if (!/^\d{12}$/.test(aadhaar))
    return res.json({ success: false, message: 'Aadhaar must be exactly 12 digits' });

  db.prepare('UPDATE users SET name=?, age=?, college=?, phone=?, aadhaar=? WHERE id=?')
    .run(name, age, college, phone, aadhaar, req.session.user.id);

  res.json({ success: true, message: 'Details updated successfully!' });
});


// ── LOGOUT ──
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));