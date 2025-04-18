# 🧠 Mental Health Event Platform

A full-stack platform designed to facilitate the organization, discovery, and participation in mental health-focused events.

## 🔧 Technologies

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Web (Admin), Mobile (User)
- **Authentication**: JWT, bcrypt
- **Payments**: Chapa Integration
- **Security**: HTTPS, Data Encryption, Privacy-first RSVP

---

## 🧑‍💼 Admin (Organizer) Web Dashboard

Admins can:

- 📝 Create and manage events (title, description, type, capacity, schedule, location)
- 💳 Enable Chapa for paid events
- 📊 Monitor registrations, seat availability, and financial metrics
- 👥 Manage registered users (anonymous or authenticated)
- 📤 Export attendee data
- 📈 Access analytics like:
  - Revenue per event
  - Payment logs
  - Event performance

---

## 📱 User Mobile App

Users can:

- 🧾 Register, log in, or RSVP anonymously
- 🔍 Discover events by category, date, location, or format
- 📥 RSVP to events (free or paid via Chapa)
- 💾 Save/bookmark events
- 👀 View upcoming, past, and saved events
- 💬 Provide post-event feedback
- 🧠 Use the in-app mental health chatbot

---

## 🤖 Mental Health Chatbot Features

- Mood tracking & journaling
- Daily check-ins
- Access to crisis contacts or support lines

---

## 💵 Payments & Privacy

- Seamless Chapa integration for paid events
- Encrypted user data (anonymous RSVP option available)
- Downloadable receipts and payment history

---

## 🚀 Getting Started (Backend Setup)

```bash
git clone https://github.com/your-username/mental-health-platform.git
cd backend
npm install
```

## 📂 Folder Structure

```
├── config/
│   └── db_connect.js
├── controllers/
│   ├── admin/
│   │   ├── authController.js
│   │   └── eventController.js
│   └── user/
│       └── userAuthController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── eventModel.js
│   └── userModel.js
├── routes/
│   ├── admin/
│   │   ├── adminAuthRoutes.js
│   │   └── eventRoutes.js
│   └── user/
│       └── userAuthRoutes.js
├── .env
├── server.js
└── README.md
```

---

## 📬 Feedback & Contributions

Feel free to open issues or pull requests to improve the platform!

---

## 📜 License

MIT License © 2025 Nathnael Keleme Kana
