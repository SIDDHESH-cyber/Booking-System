# Bookings System - SortMyScene

A robust seat booking system built using the MERN stack, designed to handle concurrent bookings seamlessly

---

## Features

Concurrency Handling: Implemented MongoDB Atomic Operations and Transactions to prevent race conditions.
Double-Booking Prevention: Strict database checks to avoid duplicate entries.
Temporary Seat Locking: A 10-minute "Time to Pay" window where seats are exclusively reserved (locked) for the current user.

---

## Tech Stack

- **Frontend :** React
- **Backend :** Node.js, Express.js
- **Database :** MongoDB

---

## Usage

#### React js - Frontend

```bash
cd Frontend
```

```bash
npm install
```

```bash
npm run dev
```

#### Node js - Backend

```bash
cd Backend
```

```bash
npm install
```

```bash
npm run dev
```

## Project Flow

1. User views available events
2. Selects seats → System checks availability
3. Seats temporarily **locked** (10 min timeout)
4. User confirms booking → Seats permanently **booked**
5. Lock expires if not confirmed and Seats get **Available**

---

## API Endpoints

### Events

#### Create An Events

```http
  POST /api/events/
```

```javascript
{
    "name" : "Amazon Web Services",
    "place" : "mumbai",
    "date" : "20-06-2026",
    "totalSeats": "25"
}
```

#### Get All Events

```http
  GET /api/events
```

#### Get Events By Id

```http
  GET /api/events/:id
```

### Booking

#### Book or Confrim a Seat

```http
  POST /api/booking/
```

```javascript
{
    "eventID" : "6a38022526808e6d9214159c",
    "seatNumber" : ["S1"],
    "reserve_id" : "6a38024326808e6d921415a7"
}
```

### Reservation

#### Reserve or Lock a Seat

```http
  POST /api/reserve/
```

```javascript
{
    "eventID" : "6a38022526808e6d9214159c",
    "seatNumber" : ["S1"],
    "userID" : "Sid"
}
```

---

## Seat Color Guide

Gray - Booked
Blue - Selected
Yellow - Reserve / Lock State
Green - Available

---
