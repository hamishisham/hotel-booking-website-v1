# 🏨 Hotel Booking Website v1

A full-stack hotel booking web application built with **React**, **Material UI (MUI)**, and **JSON Server**. The project includes a user-friendly interface for hotel browsing and booking, along with an admin dashboard to manage users, hotels, and bookings.

## 💡 About the Project

This hotel booking platform allows users to:

- 🌆 Filter hotels by city  
- 🏨 View detailed hotel information  
- 🔍 Search hotels  
- 🧾 Book hotels (front-end logic only)  
- 🔐 Register and log in to a user account *(new)*  
- 🛡️ Enjoy role-based access depending on user type *(admin/user)* *(new)*

Admins have access to a **dashboard** where they can:

- 👤 Manage users (view, add, delete)  
- 🏨 Manage hotels (create, update, delete)  
- 📆 Manage bookings  
- 🔑 Authenticate and authorize access to admin-only pages *(new)*

Data is served using **JSON Server** as a mock REST API and deployed on **Railway**.

---

## 🚀 Features

### User Side
- Register and log in 
- Browse and search for hotels
- Filter hotels by city
- View hotel details
- Book hotels (front-end logic)
- Responsive design

### Admin Dashboard
- User management (CRUD)
- Hotel management (CRUD)
- Booking management (CRUD)
- Role-based access control 
- Sidebar navigation for quick access

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Context API  
- **UI Framework:** Material UI (MUI)  
- **Backend (Mock API):** JSON Server deployed on Railway  
- **State Management:** React Context  
- **Authentication:** Basic token-based logic (front-end only)   
- **Icons:** Material Icons  

---


## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamishisham/hotel-booking-website-v1.git
   cd hotel-booking-website-v1
   npm install
   npm run dev 
