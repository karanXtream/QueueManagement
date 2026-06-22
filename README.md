# 🏥 Wooble – Smart Queue Management System

![Wooble Banner](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8)

## 📌 Overview

Wooble is a real-time queue management platform designed to modernize patient flow in clinics and healthcare centers.

Traditional clinics often rely on manual token systems, leading to confusion, overcrowding, long waiting times, and poor transparency. Wooble solves this by providing a digital queue experience where receptionists can manage patients while patients can track their queue status live through a QR code.

The system ensures real-time synchronization between staff and patients, reducing uncertainty and improving the overall clinic experience.

---

## 🚀 Features

### Receptionist Dashboard

* Add patients instantly
* Auto-generate queue tokens
* Delete patients from queue
* Search patients
* Call next token
* Configure average consultation time
* Real-time queue updates
* QR code generation for every patient

### Patient Dashboard

* Personalized queue page
* View token number
* View currently serving token
* View number of patients ahead
* Estimated waiting time
* Live updates without refreshing
* Mobile-friendly interface

### Real-Time System

* Socket.IO powered updates
* Instant queue synchronization
* No manual refresh required
* Live waiting time calculations

---

## 🧠 Problem Statement

Many clinics still manage patient queues manually.

Common issues include:

* Long waiting times
* Lack of transparency
* Patients repeatedly asking staff about queue status
* Crowded waiting areas
* No real-time updates
* Poor patient experience

Wooble addresses these issues by digitizing the entire queue workflow.

---

## 💡 Solution

Wooble provides:

1. Digital token generation
2. Real-time queue tracking
3. QR-based patient access
4. Live synchronization between receptionist and patients
5. Waiting time estimation
6. Queue visibility from any device

---

## 🏗️ Architecture

```text
Receptionist Dashboard
          │
          ▼
      Next.js
          │
          ▼
      MongoDB
          │
          ▼
     Socket.IO
          │
          ▼
Patient Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS
* Lucide React

### Backend

* Next.js Route Handlers
* Node.js

### Database

* MongoDB Atlas
* Mongoose

### Real-Time Communication

* Socket.IO

### Utilities

* QR Code Generator
* Dynamic Routing
* REST APIs

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   │   ├── patient/
│   │   ├── delete/
│   │   └── next-token/
│   │
│   ├── patients/
│   │   └── [id]/
│   │
│   └── page.js
│
├── context/
│   └── ClinicContext.js
│
├── models/
│   ├── Patient.js
│   └── QueueState.js
│
├── lib/
│   ├── mongodb.js
│   └── socket.js
│
└── socket-server.js
```

---

## 🔄 Queue Flow

### Adding a Patient

```text
Receptionist
      │
      ▼
Add Patient
      │
      ▼
Generate Token
      │
      ▼
Save to MongoDB
      │
      ▼
Generate QR Code
      │
      ▼
Patient Joins Queue
```

---

### Calling Next Token

```text
Receptionist Clicks
"Call Next"
        │
        ▼
Update QueueState
        │
        ▼
Socket Emit
        │
        ▼
All Patient Screens
Update Instantly
```

---

## 📱 QR Code Workflow

Each patient receives a unique URL:

```text
/patients/{patientId}
```

Example:

```text
http://localhost:3000/patients/6a3414487cdb3512f9fc956f
```

The QR code contains this URL.

Patients simply scan and view their queue status.

---

## 📊 Data Models

### Patient

```javascript
{
  _id,
  patientName,
  token,
  addedAt,
  status
}
```

### Queue State

```javascript
{
  currentServing,
  avgConsultationTime
}
```

---

## ⏳ Waiting Time Calculation

```javascript
estimatedWait =
tokensAhead * avgConsultationTime
```

Example:

```text
3 patients ahead
Average consultation = 5 minutes

Estimated Wait = 15 minutes
```

---

## 🔌 API Endpoints

### Create Patient

```http
POST /api/patient
```

### Get Patient

```http
GET /api/patient/:id
```

### Delete Patient

```http
DELETE /api/delete/:id
```

### Call Next Token

```http
POST /api/next-token
```

---

## 🎯 Key Design Decisions

### QR Based Access

Patients do not need:

* Login
* App Installation
* Account Creation

Just scan and track.

### Real-Time Updates

Socket.IO ensures:

* Instant updates
* Better UX
* No page refresh

### Dynamic Routes

Every patient gets a unique route:

```text
/patients/[id]
```

---

## 📈 Future Improvements

* SMS Notifications
* WhatsApp Integration
* Doctor Dashboard
* Multi-Clinic Support
* Analytics Dashboard
* Appointment Scheduling
* Patient History
* Push Notifications
* AI-Based Wait Time Prediction

---

## 🎓 What I Learned

Building Wooble strengthened my understanding of:

* Full Stack Development
* Next.js App Router
* MongoDB Design
* Real-Time Systems
* Socket.IO
* Dynamic Routing
* State Management
* API Design
* Product Thinking
* User-Centered Development

---

## 🌟 Impact

Wooble transforms a frustrating waiting experience into a transparent and predictable process.

Benefits include:

* Reduced patient anxiety
* Improved clinic efficiency
* Better communication
* Real-time visibility
* Faster patient flow
* Modern healthcare experience

---

## 👨‍💻 Author

**Karan Shrivastava**

B.Tech CSE Student
Full Stack Developer
Passionate about building impactful products using modern web technologies.

---

### “The best way to predict the future is to build it.”
