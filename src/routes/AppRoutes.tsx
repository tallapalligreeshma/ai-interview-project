import React, { lazy } from "react";
import { createBrowserRouter, useNavigate, Navigate } from "react-router-dom";

const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password/ForgotPassword"));
const Login = lazy(() => import("@/pages/auth/login/Login"));
const Register = lazy(() => import("@/pages/auth/register/Register"));
const Calendar = lazy(() => import("@/pages/calendar/Calendar"));
const CodingPage = lazy(() => import("@/pages/coding/CodingPage"));
const InterviewPage = lazy(() => import("@/pages/interview/InterviewPage"));
const Company = lazy(() => import("@/pages/setting/company/Company"));
const NotificationAlert = lazy(() => import("@/pages/setting/notification-alert/NotificationAlert"));
const SettingsNotification = lazy(() => import("@/pages/setting/settings-notification/SettingsNotification"));

import NotFound from '../error/404';
import RouteErrorBoundary from "../error/RouteErrorBoundary";
import MainLayout from "../layouts/MainLayout";
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Home = lazy(() => import("../pages/Home"));
const AiDashboard = lazy(() => import("../pages/dashboards/dashboard/AiDashboard"));
const JobRoles = lazy(() => import("../pages/job-roles/JobRoles"));
const RoleDetails = lazy(() => import("../pages/job-roles/RoleDetails"));
const AiPrepDashboard = lazy(() => import("../pages/dashboards/dashboard/AiPrepDashboard"));
const AptitudeDashboard = lazy(() => import("../pages/aptitude/AptitudeDashboard"));
const TopicDetail = lazy(() => import("../pages/aptitude/TopicDetail"));
const AptitudeTestPage = lazy(() => import("../pages/aptitude/AptitudeTestPage"));
const AptitudeLevelPage = lazy(() => import("../pages/aptitude/AptitudeLevelPage"));
const AptitudeMockTestPage = lazy(() => import("../pages/aptitude/AptitudeMockTestPage"));
const ResultPage = lazy(() => import("../pages/interview/ResultPage"));
const VoiceInterviewPage = lazy(() => import("../pages/interview/VoiceInterviewPage"));
const VideoInterviewPage = lazy(() => import("../pages/interview/VideoInterviewPage"));
const PerformanceDashboard = lazy(() => import("../pages/performance/PerformanceDashboard"));
const PracticePage = lazy(() => import("../pages/practice/PracticePage"));
const HistoryPage = lazy(() => import("../pages/history/HistoryPage"));
const AptitudePracticeHub = lazy(() => import("../pages/aptitude/AptitudePracticeHub"));
const MockTestsPage = lazy(() => import("../pages/mock-tests/MockTestsPage"));
const LiveMockTest = lazy(() => import("../pages/mock-tests/LiveMockTest"));
const AchievementsPage = lazy(() => import("../pages/achievements/AchievementsPage"));
const AiAssistantPage = lazy(() => import("../pages/ai-assistant/AiAssistantPage"));
const ResumeAnalyzer = lazy(() => import("../pages/ai-assistant/ResumeAnalyzer"));
const SettingsPage = lazy(() => import("@/pages/setting/SettingsPage"));
const FeaturesPage = lazy(() => import("../pages/FeaturesPage"));

const RotationSystemPage = lazy(() => import("../pages/rotation/RotationSystemPage"));
const PersonalitySystemPage = lazy(() => import("../pages/personality/PersonalitySystemPage"));
const QuestionEnginePage = lazy(() => import("../pages/question-engine/QuestionEnginePage"));
const WeaknessTrackerPage = lazy(() => import("../pages/weakness/WeaknessTrackerPage"));

const DemoAutologin = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        const mockUser = { username: "Guest Hunter", email: "demo@ai-coach.com" };
        localStorage.setItem('token', 'mock_token_for_demo');
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate("/ai-interview-dashboard", { replace: true });
    }, [navigate]);
    return <div className="flex items-center justify-center min-h-screen">Logging you in...</div>;
};




export const router = createBrowserRouter([
  {
    element: <GuestRoutes />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
    ]
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <RouteErrorBoundary />,
        children: [
       {
            index: true,
            element: <Home />,
          },
          {
            path: "/demo",
            element: <DemoAutologin />
          },
          {
            path: "/ai-interview-dashboard", element: <AiDashboard />
          },
          {
            path: "/ai-prep", element: <AiPrepDashboard />
          },
          {
            path: "/interview", element: <InterviewPage />
          },
          {
            path: "/interview/:roleSlug", element: <InterviewPage />
          },
          {
            path: "/voice-interview", element: <VoiceInterviewPage />
          },
          {
            path: "/video-interview", element: <VideoInterviewPage />
          },
          {
            path: "/practice", element: <PracticePage />
          },

          {
            path: "/coding", element: <CodingPage />
          },
          {
            path: "/history", element: <HistoryPage />
          },

          {
            path: "/interview/result", element: <ResultPage />
          },
          {
            path: "/report", element: <PerformanceDashboard />
          },
          {
            path: "/performance", element: <PerformanceDashboard />
          },
          {
            path: "/aptitude-practice", element: <AptitudePracticeHub />
          },

          {
            path: "/settings", element: <SettingsPage />
          },
          {
            path: "/mock-tests", element: <MockTestsPage />
          },
          {
            path: "/mock-tests/live", element: <LiveMockTest />
          },
          {
            path: "/achievements", element: <AchievementsPage />
          },
          {
            path: "/resume-analyzer", element: <ResumeAnalyzer />
          },
          {
            path: "/ai-assistant", element: <AiAssistantPage />
          },
          {
            path: "/rotation", element: <RotationSystemPage />
          },
          {
            path: "/personality", element: <PersonalitySystemPage />
          },
          {
            path: "/question-engine", element: <QuestionEnginePage />
          },
          {
            path: "/weakness-tracker", element: <WeaknessTrackerPage />
          },
          {
            path: "/features", element: <FeaturesPage />
          },


          {
            path: "/roles", element: <JobRoles />
          },
          {
            path: "/roles/:roleId", element: <RoleDetails />
          },
          {
            path: "/aptitude", element: <AptitudeDashboard />
          },
          {
            path: "/aptitude/topic/:topic", element: <TopicDetail />
          },
          {
            path: "/aptitude/question/:id", element: <AptitudeTestPage />
          },
          {
            path: "/aptitude/test", element: <AptitudeTestPage />
          },
          {
            path: "/aptitude/mock-tests", element: <AptitudeMockTestPage />
          },
          {
            path: "/aptitude/:level", element: <AptitudeLevelPage />
          },
          {
            path: "calendar", element: <Calendar />
          },
          {
            path: "company", element: <Company />
          },
          {
            path: "settings-notification", element: <SettingsNotification />
          },
          {
            path: "notification-alert", element: <NotificationAlert />
          },
        ],
      },
    ]
  },

  {
    path: "*",
    element: <NotFound />,
    errorElement: <RouteErrorBoundary />,
  },
]);