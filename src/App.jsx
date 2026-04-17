import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import MainWrapper from './components/wrappers/MainWrapper'
import HomePage from './page-components/HomePage'
import ImageToPDFPage from './page-components/ImageToPDFPage'
import MergePDFPage from './page-components/MergePDFPage'
import PDFToImagePage from './page-components/PDFToImagePage'
import SplitPDFPage from './page-components/SplitPDFPage'
import RotatePDFPage from './page-components/RotatePDFPage'
import AboutPage from './page-components/AboutPage'
import ContactPage from './page-components/ContactPage'
import FAQPage from './page-components/FAQPage'
import PrivacyPage from './page-components/PrivacyPage'
import TermsPage from './page-components/TermsPage'
import CameraToPDFPage from './page-components/CameraToPDFPage'
import SignPDFPage from './page-components/SignPDFPage'
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
