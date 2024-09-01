import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/ui/Loading";
import AdminLayout from "./layout/AdminLayout"; // Import your layout

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Room = lazy(() => import("./pages/Classroom"));
const Challenges = lazy(() => import("./pages/Challenges"));
const BasicLevelHTML = lazy(() => import("./pages/BasicLevelHTML"));
const BasicLevelCSS = lazy(() => import("./pages/BasicLevelCSS"));
const IntermediateLevel = lazy(() => import("./pages/IntermediateLevel"));
const AdvancedLevel = lazy(() => import("./pages/AdvancedLevel"));
const NotFound = lazy(() => import("./pages/404"));
const Previlege = lazy(() => import("./pages/Previlege"));
const AdminResources = lazy(() => import("./admin/AdminResources"));
import Dashboard from "./admin/Dashboard";
import Students from "./admin/Students";
const LoadingQoutes = lazy(() => import("./pages/LoadingQoutes"));
const OnlineResources = lazy(() => import("./pages/OnlineResources"));
import AdminClassroom from "./admin/Classroom";
import Classroom from "./admin/Classroom";
import ClassroomDetails from "./admin/ClassroomDetails";
import CreateContent from "./admin/CreateContent";
import Task from "./admin/Task";
import ClassroomStudents from "./admin/ClassroomStudents";
import Leaderboards from "./admin/Leaderboards";
import ArchivedRooms from "./admin/ArchivedRooms";
const QuizPreview = lazy(() => import("./pages/QuizPreview"));
import Settings from "./pages/Settings";
import SetupProfile from "./pages/SetupProfile";

import ProtectedRoute from "./private/ProtectedRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthProvider } from "./hooks/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
function App() {
  return (
    <div className="App font-SpaceGrotesk text-zinc-950 bg-white">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                  <Home />
                </NextThemesProvider>
              </NextUIProvider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/setup-profile"
            element={
              <ProtectedRoute>
                <SetupProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:id"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessments"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online-resources"
            element={
              <ProtectedRoute>
                <OnlineResources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/qoutes"
            element={
              <ProtectedRoute>
                <LoadingQoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students-previlege"
            element={
              <ProtectedRoute>
                <Previlege />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz-preview"
            element={
              <ProtectedRoute>
                <QuizPreview />
              </ProtectedRoute>
            }
          />
          {/* Admin routes */}

          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="manage-students" element={<Students />} />
            <Route path="admin-create-classroom" element={<AdminClassroom />} />
            <Route path="classroom/:id" element={<ClassroomDetails />} />
            <Route
              path="classroom/create-content/:id"
              element={<CreateContent />}
            />
            <Route path="classroom/create-task/:id" element={<Task />} />
            <Route
              path="classroom/students/:id"
              element={<ClassroomStudents />}
            />
            <Route path="leaderboards" element={<Leaderboards />} />
            <Route path="archived-rooms" element={<ArchivedRooms />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
