import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import MainWrapper from './components/wrappers/MainWrapper'
import HomePage from './pages/HomePage'
import ImageToPDFPage from './pages/ImageToPDFPage'
import MergePDFPage from './pages/MergePDFPage'
import PDFToImagePage from './pages/PDFToImagePage'
import SplitPDFPage from './pages/SplitPDFPage'
import RotatePDFPage from './pages/RotatePDFPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CameraToPDFPage from './pages/CameraToPDFPage'
import SignPDFPage from './pages/SignPDFPage'
import './App.css'

function App() {
  return (
    <MainWrapper>
      <ScrollToTop />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/image-to-pdf" element={<ImageToPDFPage />} />
        <Route path="/merge-pdf"   element={<MergePDFPage />} />
        <Route path="/pdf-to-image" element={<PDFToImagePage />} />
        <Route path="/split-pdf"   element={<SplitPDFPage />} />
        <Route path="/rotate-pdf"  element={<RotatePDFPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/faq"         element={<FAQPage />} />
        <Route path="/privacy"     element={<PrivacyPage />} />
        <Route path="/terms"         element={<TermsPage />} />
        <Route path="/camera-to-pdf" element={<CameraToPDFPage />} />
        <Route path="/sign-pdf"      element={<SignPDFPage />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </MainWrapper>
  )
}

export default App
