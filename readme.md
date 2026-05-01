# 📰 News Alert App

A full-stack **real-time news application** that delivers category-based news with a clean dashboard UI and user authentication.

---

## 🚀 Live Demo

* 🌐 Frontend: https://newsalertapp-frontend.netlify.app
* ⚙️ Backend: https://newsalertapp-backend.onrender.com

---

## 📌 Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Secure cookies (httpOnly)

### 📰 News System

* Fetch latest news using GNews API
* Category-based filtering:

  * Technology
  * Sports
  * Business
  * Health
  * Entertainment
  * Science
* Trending news section (Top 3)

### 🎨 UI/UX

* Dashboard-style layout
* Responsive design
* News cards with:

  * Image
  * Title
  * Description
  * Time

### ✅ Validation

* Frontend validation (custom error messages)
* Backend validation (email, password rules)
* Proper error handling with toast notifications

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### API

* GNews API

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GNEWS_API_KEY=your_api_key
```

### Frontend (`.env`)

```
VITE_API_URL=https://newsalertapp-backend.onrender.com
```

---

## 📦 Installation

### Clone repo

```
git clone https://github.com/your-username/news-alert-app.git
cd news-alert-app
```

### Backend setup

```
cd backend
npm install
npm run dev
```

### Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 📊 API Endpoints

| Method | Endpoint                      | Description   |
| ------ | ----------------------------- | ------------- |
| POST   | /api/auth/register            | Register user |
| POST   | /api/auth/login               | Login user    |
| GET    | /api/news?category=technology | Fetch news    |

---

## ⚠️ Notes

* GNews API has a daily limit (100 requests)
* If limit is reached, news may not load temporarily
* Use caching or another API key for testing

---

## 🧠 Future Improvements

* 🔔 Email notifications
* 📊 User preferences (custom alerts)
* 🧠 AI-based recommendations
* 📱 Mobile app version

---

## 👨‍💻 Author

**Maharaj C B**

---

## ⭐ Conclusion

This project demonstrates:

* Full-stack development (MERN)
* API integration
* Authentication & security
* Clean UI/UX design

---

💯 *Built with focus on real-world application development*
