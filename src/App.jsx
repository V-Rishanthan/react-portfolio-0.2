import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contaxt/AuthContext';
import { ProjectContextProvider } from './contaxt/ProjectContext';
import { EducationProvider } from './contaxt/EducationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../src/components/NotFound';

function Layout() {
	const location = useLocation();
	const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/dashboard';
	const hideLayout =
		location.pathname.startsWith("/admin") || location.pathname.startsWith("/login") || location.pathname.startsWith("/dashboard");



	return (
		<>
			{!hideLayout && (
				<>
					<SoftBackdrop />
					<LenisScroll />
					<Navbar />
				</>
			)}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Login />} />
				<Route path="/admin/login" element={<Login />} />

				<Route
					path="/admin/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* {!isAdminPage && <Footer />} */}
			{!hideLayout && <Footer />}
			{!hideLayout && <Navbar />}

		</>
	);
}

function App() {
	return (
		<AuthProvider>
			<ProjectContextProvider>
				<EducationProvider>
					<BrowserRouter>
						<Layout />
					</BrowserRouter>
				</EducationProvider>
			</ProjectContextProvider>
			<ToastContainer position="top-right" theme="dark" />
		</AuthProvider>
	);
}

export default App;