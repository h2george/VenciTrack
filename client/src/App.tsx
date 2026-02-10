import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";
import DocumentsPage from "./pages/Documents";
import DocumentTypesPage from "./pages/DocumentTypes";
import HistoryPage from "./pages/History";
import SettingsPage from "./pages/Settings";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/document-types" element={<DocumentTypesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
}

export default App;
