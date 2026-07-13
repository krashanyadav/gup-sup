# 💬 Gup-Sup - Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack, designed to provide a fast, secure, and modern messaging experience. The application supports one-to-one conversations, real-time messaging, media sharing, typing indicators, online presence, and email-based account verification.

> **Project Type:** Collaborative Project (2 Developers)  
> **My Role:** Backend Developer (Primary)

---

#  Project Overview

Gup-Sup is a real-time chat platform that enables users to communicate instantly with secure authentication and modern chat features. The backend was designed with scalability, clean REST APIs, JWT authentication, Socket.IO integration, and secure media handling.

---

# 👨‍💻 My Contribution (Backend Developer)

I was primarily responsible for the backend development, including:

- Authentication & Authorization
- Email OTP Verification
- JWT Authentication
- REST API Development
- MongoDB Database Design
- Socket.IO Real-Time Communication
- Contact Management APIs
- Chat & Conversation APIs
- Media Upload Integration (ImageKit)
- Message Status (Sent, Delivered, Seen)
- Typing Indicator
- User Presence (Online/Offline)
- Backend Validation & Error Handling

---

# 🚀 Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout
- Password Encryption using bcrypt
- Email OTP Verification before account activation

---

## User Module

- Get User Profile
- Update Profile
- Upload Profile Picture
- Get All Users
- Get User by ID

---

## Contact Management

- Add Contact
- Remove Contact
- View Contact List

---

## Real-Time Chat

- One-to-One Chat
- Instant Messaging
- Real-Time Socket Communication
- Automatic Conversation Creation
- Chat History
- Media Messages
- Image Sharing
- File Sharing
- Typing Indicator
- Online / Offline Status
- Auto Scroll
- Message Synchronization

---

## Message Features

- Send Message
- Edit Message
- Delete Message
- Emoji Reactions
- Seen Status
- Delivered Status
- Read Receipts
- Message History

---

## Media Upload

- Image Upload
- File Upload
- ImageKit Cloud Storage Integration

---

## Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs
- Input Validation
- Secure File Upload
- Environment Variables

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
- Multer
- ImageKit
- Nodemailer

## Database

- MongoDB Atlas

---

# 📂 Backend API Modules

## Authentication

- Register
- Email Verification
- Login
- Logout

## User

- Get Profile
- Update Profile
- Get User By ID
- Get All Users

## Contacts

- Add Contact
- Remove Contact
- Get Contacts

## Messages

- Send Message
- Get Chats
- Get Messages
- Edit Message
- Delete Message
- Message Delivered
- Message Seen
- Emoji Reaction

---

# 📁 Project Structure

```
Backend
│
├── Controllers
├── Models
├── Routes
├── Middleware
├── Helpers
├── Config
├── Socket
├── Utils
└── Server
```

---

# 🔐 Authentication Flow

```text
Register
      │
      ▼
Email OTP Verification
      │
      ▼
Account Verified
      │
      ▼
Login
      │
      ▼
JWT Token Generated
      │
      ▼
Protected APIs
```

---

# 💬 Real-Time Communication Flow

```text
User A
    │
Socket.IO
    │
Server
    │
Socket.IO
    │
User B
```

---

# 📷 Media Upload Flow

```text
User
   │
Select Image/File
   │
Multer
   │
ImageKit
   │
Store URL
   │
MongoDB
   │
Realtime Broadcast
```

---

# 📦 Installation

```bash
git clone <repository-url>
```

```bash
cd Backend-chatApp
```

```bash
npm install
```

Create a `.env` file and configure:

```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL=
EMAIL_PASSWORD=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Start the server:

```bash
npm run dev
```

---

# 🎯 Future Improvements

- Group Chat
- Voice Calling
- Video Calling
- Push Notifications
- Message Search
- Voice Notes
- Message Forwarding
- Chat Backup
- End-to-End Encryption
- Multi-device Login

---

# 👥 Team

This project was developed collaboratively by **2 developers**.

### My Responsibilities (Backend Developer)

- Backend Architecture
- REST APIs
- Authentication System
- Email Verification
- Database Design
- Real-Time Communication
- Socket.IO Integration
- Message Management
- Contact APIs
- Media Upload APIs
- Security Implementation

---

# 📄 License

This project is created for learning and portfolio purposes.