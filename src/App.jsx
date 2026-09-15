import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeDashboard from './components/HomeDashboard';
import StudyHub from './components/StudyHub';
import ExamHub from './components/ExamHub';
import ExamView from './components/ExamView';
import ResultSummary from './components/ResultSummary';
import EssayMistakeReview from './components/EssayMistakeReview';
import ApiKeyModal from './components/ApiKeyModal';
import ImportExamModal from './components/ImportExamModal';
import ProUpgradeModal from './components/ProUpgradeModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import SsoLoginModal from './components/SsoLoginModal';
import LegalHub from './components/LegalHub';
import Footer from './components/Footer';
import { DEFAULT_EXAMS } from './data/sampleExams';
import { DEFAULT_LECTURES } from './data/studyLectures';
import { getActiveApiKey } from './data/apiConfig';
import { sound } from './utils/soundEffects';
import { getSubscriptionStatus, upgradeToPro } from './utils/subscriptionManager';
import { isAdminLoggedIn, adminLogout } from './utils/adminAuth';
import { getCurrentUser, logoutSsoUser } from './utils/ssoAuth';

export default function App() {
  // Navigation: 'home' | 'study' | 'exam_hub' | 'test' | 'result' | 'essay_review' | 'admin' | 'legal'
  const [currentView, setCurrentView] = useState('home');
  const [activeSubject, setActiveSubject] = useState('ALL');
  const [activeLegalTab, setActiveLegalTab] = useState('terms');

  const handleOpenLegalPolicy = (tabId = 'terms') => {
    setActiveLegalTab(tabId);
    setCurrentView('legal');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Exams: Separation of Admin Official Repository & Client Uploaded Exams
  const [exams, setExams] = useState(() => {
    const adminExams = (DEFAULT_EXAMS || []).map(e => ({
      ...e,
      source: 'admin',
      isDefault: true
    }));
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('custom_exams') : null;
      if (saved) {
        const raw = JSON.parse(saved);
        if (Array.isArray(raw)) {
          const parsed = raw
            .filter(e => e && typeof e === 'object' && e.id && Array.isArray(e.questions))
            .map(e => ({
              ...e,
              source: 'client',
              isCustom: true
            }));
          return [...adminExams, ...parsed];
        }
      }
    } catch (e) {
      console.warn("Could not load custom exams from localStorage:", e);
    }
    return adminExams;
  });

  const [currentExamId, setCurrentExamId] = useState(DEFAULT_EXAMS[0]?.id || '');
  const [currentMode, setCurrentMode] = useState('exam'); // 'exam' | 'practice'

  // Results & Mistake Review
  const [resultData, setResultData] = useState(null);
  const [essayReviewQuestions, setEssayReviewQuestions] = useState([]);

  // Preferences
  const [antiTabEnabled, setAntiTabEnabled] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('exam_theme') || 'light');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('exam_font_size') || 'normal');
  const [apiKey, setApiKey] = useState(() => getActiveApiKey());

  // Subscription (Free 3 uses/day vs PRO Unlimited $3/month)
  const [subscription, setSubscription] = useState(() => getSubscriptionStatus());

  // Admin Authentication (Default password: 123)
  const [isAdmin, setIsAdmin] = useState(() => isAdminLoggedIn());

  // SSO Authentication
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  // Modals
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showSsoModal, setShowSsoModal] = useState(false);

  useEffect(() => {
    const handleSubChange = () => {
      setSubscription(getSubscriptionStatus());
    };
    window.addEventListener('subscription-changed', handleSubChange);
    return () => window.removeEventListener('subscription-changed', handleSubChange);
  }, []);

  useEffect(() => {
    const handleAdminChange = () => {
      setIsAdmin(isAdminLoggedIn());
    };
    window.addEventListener('admin-auth-changed', handleAdminChange);
    return () => window.removeEventListener('admin-auth-changed', handleAdminChange);
  }, []);

  useEffect(() => {
    const handleSsoChange = () => {
      const user = getCurrentUser();
      setCurrentUser(user);
      if (user?.isPro) {
        try { upgradeToPro('VIP_SSO_AUTO_GRANT'); } catch (e) {}
      }
    };
    window.addEventListener('sso-auth-changed', handleSsoChange);
    return () => window.removeEventListener('sso-auth-changed', handleSsoChange);
  }, []);

  const handleDeleteCustomExam = (examId) => {
    setExams(prev => {
      const target = prev.find(e => e.id === examId);
      if (target && (target.source === 'admin' || target.isDefault)) {
        alert("Đây là đề thi mẫu của Admin, không thể xóa khỏi kho đề chung.");
        return prev;
      }
      const next = prev.filter(e => e.id !== examId);
      try {
        const customOnly = next.filter(e => e.source === 'client' || e.isCustom);
        localStorage.setItem('custom_exams', JSON.stringify(customOnly));
      } catch (e) {}
      return next;
    });
    try { sound.playClick(); } catch (e) {}
  };

  // Apply theme & font-size & pro plan to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('exam_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('exam_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.setAttribute('data-plan', subscription?.isPro ? 'pro' : 'free');
  }, [subscription?.isPro]);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('ai_api_key', key);
  };

  const handleImportExam = (newExam, startImmediately = false) => {
    const preparedExam = {
      ...newExam,
      source: 'client',
      isCustom: true,
      uploadedAt: Date.now()
    };

    setExams(prev => {
      const filtered = prev.filter(e => e.id !== preparedExam.id && e.title !== preparedExam.title);
      const next = [preparedExam, ...filtered];
      try {
        const customOnly = next.filter(e => e.source === 'client' || e.isCustom);
        localStorage.setItem('custom_exams', JSON.stringify(customOnly));
      } catch (e) {
        console.warn("Storage full", e);
      }
      return next;
    });

    // Auto-detect subject and switch tab
    const s = ((preparedExam.subject || '') + ' ' + (preparedExam.title || '') + ' ' + (preparedExam.id || '')).toUpperCase();
    let targetSubject = 'ALL';
    if (s.includes('CEA')) targetSubject = 'CEA';
    else if (s.includes('CSD')) targetSubject = 'CSD';
    else if (s.includes('DBI')) targetSubject = 'DBI';

    setActiveSubject(targetSubject);
    setCurrentExamId(preparedExam.id);

    try {
      sound.playCorrect();
    } catch (e) {}

    if (startImmediately) {
      setCurrentMode('exam');
      setCurrentView('test');
    } else {
      setCurrentView('exam_hub');
    }
  };

  const currentExam = (exams && exams.length > 0)
    ? (exams.find(e => e && e.id === currentExamId) || exams[0])
    : (DEFAULT_EXAMS[0] || { id: 'fallback', title: 'Đề thi', questions: [] });

  // Start exam from ExamHub
  const handleStartExam = (examId, mode) => {
    setCurrentExamId(examId);
    setCurrentMode(mode);
    setCurrentView('test');
  };

  // Submission handler
  const handleFinishExam = (data) => {
    setResultData(data);
    setCurrentView('result');
  };

  // Start Essay Review
  const handleStartEssayReview = (questions) => {
    setEssayReviewQuestions(questions);
    setCurrentView('essay_review');
  };

  return (
    <div className="app-container">
      <div className="ambient-bg"></div>

      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'admin' && !isAdmin) {
            setShowAdminLogin(true);
            return;
          }
          setCurrentView(view);
        }}
        antiTabEnabled={antiTabEnabled}
        onToggleAntiTab={() => {
          if (!subscription?.isPro) {
            try { sound.playWrong(); } catch (e) {}
            setShowProModal(true);
            return;
          }
          setAntiTabEnabled(!antiTabEnabled);
        }}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        apiKey={apiKey}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        onOpenImportModal={() => setShowImportModal(true)}
        subscription={subscription}
        onOpenProModal={() => setShowProModal(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
        onLogoutAdmin={() => {
          adminLogout();
          setIsAdmin(false);
          if (currentView === 'admin') setCurrentView('home');
        }}
        currentUser={currentUser}
        onOpenSsoModal={() => setShowSsoModal(true)}
        onLogoutUser={logoutSsoUser}
        onOpenLegalPolicy={handleOpenLegalPolicy}
      />

      {/* 1. Home Dashboard */}
      {currentView === 'home' && (
        <HomeDashboard
          onNavigateToStudy={() => setCurrentView('study')}
          onNavigateToExam={() => setCurrentView('exam_hub')}
          onSelectSubject={(subj) => setActiveSubject(subj)}
          onOpenImportModal={() => setShowImportModal(true)}
          subscription={subscription}
          onOpenProModal={() => setShowProModal(true)}
          adminExamsCount={exams.filter(e => e.source !== 'client' && !e.isCustom).length}
          clientExamsCount={exams.filter(e => e.source === 'client' || e.isCustom).length}
          examsCount={exams.length}
          lecturesCount={DEFAULT_LECTURES.length}
          currentUser={currentUser}
          onOpenSsoModal={() => setShowSsoModal(true)}
        />
      )}

      {/* 2. Study Hub */}
      {currentView === 'study' && (
        <StudyHub
          activeSubject={activeSubject}
          onBackToHome={() => setCurrentView('home')}
          onNavigateToExam={() => setCurrentView('exam_hub')}
          apiKey={apiKey}
          onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        />
      )}

      {/* 3. Exam Hub */}
      {currentView === 'exam_hub' && (
        <ExamHub
          exams={exams}
          activeSubject={activeSubject}
          subscription={subscription}
          onOpenProModal={() => setShowProModal(true)}
          onBackToHome={() => setCurrentView('home')}
          onStartExam={handleStartExam}
          onOpenImportModal={() => setShowImportModal(true)}
          onDeleteExam={handleDeleteCustomExam}
        />
      )}

      {/* 4. Active Exam View */}
      {currentView === 'test' && (
        <ExamView
          key={`${currentExamId}-${currentMode}`}
          exam={currentExam}
          mode={currentMode}
          antiTabEnabled={antiTabEnabled}
          subscription={subscription}
          onOpenProModal={() => setShowProModal(true)}
          onFinishExam={handleFinishExam}
          onOpenEssayReview={(qs) => handleStartEssayReview(qs)}
        />
      )}

      {/* 5. Result Summary */}
      {currentView === 'result' && resultData && (
        <ResultSummary
          resultData={resultData}
          subscription={subscription}
          onOpenProModal={() => setShowProModal(true)}
          onRetakeExam={() => setCurrentView('test')}
          onSelectAnotherExam={() => setCurrentView('exam_hub')}
          onStartEssayReview={handleStartEssayReview}
        />
      )}

      {/* 6. Essay Review with AI Grading */}
      {currentView === 'essay_review' && (
        <EssayMistakeReview
          questions={essayReviewQuestions}
          apiKey={apiKey}
          onOpenApiKeyModal={() => setShowApiKeyModal(true)}
          onBack={() => {
            if (resultData) setCurrentView('result');
            else setCurrentView('exam_hub');
          }}
        />
      )}

      {/* 7. Admin Dashboard (Only displayed if logged in as admin) */}
      {currentView === 'admin' && (
        isAdmin ? (
          <AdminDashboard
            exams={exams}
            onDeleteCustomExam={handleDeleteCustomExam}
            onOpenImportModal={() => setShowImportModal(true)}
            onOpenApiKeyModal={() => setShowApiKeyModal(true)}
            apiKey={apiKey}
            onStartExam={handleStartExam}
            onBackToHome={() => setCurrentView('home')}
          />
        ) : (
          <div className="main-wrapper" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h2 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Khu Vực Quản Trị Hệ Thống</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Vui lòng đăng nhập với tài khoản Quản trị viên để truy cập bảng điều khiển hệ thống.
            </p>
            <button className="btn btn-primary" onClick={() => setShowAdminLogin(true)}>
              Đăng Nhập Admin Ngay
            </button>
          </div>
        )
      )}

      {/* 8. Legal & Policy Center */}
      {currentView === 'legal' && (
        <LegalHub
          initialTab={activeLegalTab}
          onBack={() => setCurrentView('home')}
          onDataCleared={() => {
            setSubscription(getSubscriptionStatus());
            setCurrentUser(null);
            setCurrentView('home');
          }}
        />
      )}

      {/* Global Application Footer */}
      <Footer
        onNavigate={(view) => {
          if (view === 'legal') handleOpenLegalPolicy('terms');
          else setCurrentView(view);
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenLegalTab={handleOpenLegalPolicy}
      />

      {/* Modals */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <ImportExamModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onExamImported={handleImportExam}
      />

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        onSubscriptionChanged={() => setSubscription(getSubscriptionStatus())}
        onOpenApiKeyModal={() => {
          setShowProModal(false);
          setShowApiKeyModal(true);
        }}
        onOpenLegalPolicy={handleOpenLegalPolicy}
      />

      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setCurrentView('admin');
        }}
      />

      <SsoLoginModal
        isOpen={showSsoModal}
        onClose={() => setShowSsoModal(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onOpenLegalPolicy={handleOpenLegalPolicy}
      />
    </div>
  );
}
