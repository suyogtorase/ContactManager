# Contact Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing contacts. Features a modern dark-themed UI with real-time contact management capabilities.

## 🚀 Features

- **Add Contacts**: Create new contacts with name, email, phone, and optional message
- **View Contacts**: Display all contacts in a clean, organized list
- **Delete Contacts**: Remove contacts with confirmation modal
- **Sort Contacts**: Toggle alphabetical sorting on demand
- **Form Validation**: Client-side validation for email and phone number
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern dark-themed UI with smooth animations
- **Real-time Updates**: Contact list updates without page reload

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19.2.0) - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** (v4.1.18) - Styling framework
- **Axios** (v1.13.2) - HTTP client
- **Lucide React** (v0.469.0) - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - Database
- **Mongoose** (v9.1.1) - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## ⚙️ Environment Setup

1. **Create a `.env` file in the root directory**
   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/contactdb
   ```

   For MongoDB Atlas, use:
   ```env
   MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/contactdb
   ```

## 🚀 Running the Application

### Start Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

## 📁 Project Structure

```
Task/
├── backend/
│   ├── controller/
│   │   └── contactController.js    # Contact business logic
│   ├── model/
│   │   └── contactModel.js         # MongoDB schema
│   ├── routes/
│   │   └── ContactRouter.js        # API routes
│   └── index.js                     # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.jsx            # Contact card component
│   │   │   ├── ContactForm.jsx     # Add contact form
│   │   │   └── ContactList.jsx      # Contact list component
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/submit-contact` | Create a new contact |
| GET | `/get-contacts` | Get all contacts |
| DELETE | `/delete-contact/:id` | Delete a contact by ID |

### Request/Response Examples

#### Create Contact
```javascript
POST /api/submit-contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Optional message"
}
```

#### Get All Contacts
```javascript
GET /api/get-contacts

Response:
{
  "success": true,
  "contacts": [...]
}
```

#### Delete Contact
```javascript
DELETE /api/delete-contact/:id

Response:
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## ✨ Features in Detail

### Contact Form
- **Required Fields**: Name, Email, Phone
- **Optional Field**: Message
- **Validation**:
  - Email format validation
  - 10-digit phone number validation
  - Real-time error messages
  - Submit button disabled when form is invalid

### Contact List
- **Toggle View**: Switch between Add Contact and View Contacts
- **Sorting**: Optional alphabetical sorting (A-Z)
- **Delete**: Remove contacts with confirmation modal
- **Responsive**: Card-based layout for mobile, table for desktop

### Contact Card
- **Avatar**: Initial-based avatar with gradient
- **Contact Info**: Name, email, phone, message, date added
- **Actions**: Delete button with confirmation
- **Hover Effects**: Smooth transitions and shadows

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark color scheme
- **Gradient Backgrounds**: Beautiful gradient effects
- **Smooth Animations**: Fade-in, slide-in animations
- **Icons**: Lucide React icons throughout
- **Responsive Design**: Mobile-first approach
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages

## 🔒 Validation Rules

### Frontend Validation
- **Name**: Required, non-empty
- **Email**: Required, valid email format
- **Phone**: Required, exactly 10 digits
- **Message**: Optional

### Backend Validation
- **Name**: Required
- **Email**: Required, valid format, unique
- **Phone**: Required, 10 digits
- **Message**: Optional

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check `MONGO_URL` in `.env` file
- Verify MongoDB Atlas credentials if using cloud

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### CORS Errors
- Ensure backend CORS is properly configured
- Check frontend API URL matches backend port

## 📝 Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ using React, Node.js, Express, and MongoDB

---

**Note**: Make sure to set up your MongoDB connection string in the `.env` file before running the application.

