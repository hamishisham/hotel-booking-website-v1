import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Admin/Dashboard';
import HomePage from './pages/User/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import DashboardLayout from './components/Admin/DashboardLayout';
import HotelsTable from './components/Admin/HotelsTable';
import UsersTable from './components/Admin/UsersTable';
import BookingsTable from './components/Admin/BookingsTable.';
import ProtectedAdminRoute from './pages/Admin/ProtectedAdminRoute';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booknest" element={<HomePage />} />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedAdminRoute>
              <DashboardLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/booknest" element={<HomePage />} />
          <Route path="/dashboard/hotels" element={<HotelsTable />} />
          <Route path="/dashboard/hotels/:id" element={<HotelsTable />} />
          <Route path="/dashboard/users" element={<UsersTable />} />
          <Route path="/dashboard/users/:id" element={<Dashboard />} />
          <Route path="/dashboard/bookings" element={<BookingsTable />} />
          <Route path="/dashboard/bookings/:id" element={<UsersTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
