import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/ui/Loading";
import AdminLayout from "./layout/AdminLayout"; // Import your layout

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Challenges = lazy(() => import("./pages/Challenges"));
const NotFound = lazy(() => import("./pages/404"));
const Previlege = lazy(() => import("./pages/Previlege"));
const AdminResources = lazy(() => import("./admin/AdminResources"));
import Dashboard from "./admin/Dashboard";
import Students from "./admin/Students";
const LoadingQoutes = lazy(() => import("./pages/LoadingQoutes"));
import AdminClassroom from "./admin/Classroom";
import ClassroomDetails from "./admin/ClassroomDetails";
import CreateContent from "./admin/CreateContent";
import Task from "./admin/Task";
import ClassroomStudents from "./admin/ClassroomStudents";
import Leaderboards from "./admin/Leaderboards";
import ArchivedRooms from "./admin/ArchivedRooms";
import Settings from "./pages/Settings";
import SetupProfile from "./pages/SetupProfile";
import CodeEditor from "./pages/CodeEditor";
import Developers from "./pages/Developers";

//STUDENT
import StudentDashboard from "./pages/StudentDashboard";
import Module from "./pages/Modules";
import Learning from "./pages/Learning";
import PlayGame from "./pages/PlayGame";

import ProtectedRoute from "./private/ProtectedRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// CONTENT
const BasicHTML = lazy(() => import("./content/BasicHTML"));
const BasicCSS = lazy(() => import("./content/BasicCSS"));
const BasicJS = lazy(() => import("./content/BasicJS"));

const Html_Quiz = lazy(() => import("./quizzes/Html_Quiz"));
const Css_Quiz = lazy(() => import("./quizzes/Css_Quiz"));

function App() {
  return (
    <div className="App font-Manrope text-zinc-950 bg-white">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/developers" element={<Developers />} />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/learnings"
            element={
              <ProtectedRoute>
                <Learning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/school-modules"
            element={
              <ProtectedRoute>
                <Module />
              </ProtectedRoute>
            }
          />
          <Route
            path="/codecian-editor"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/play-game"
            element={
              <ProtectedRoute>
                <PlayGame />
              </ProtectedRoute>
            }
          />

          {/* CONTENT  OF THE WEBSITE*/}
          <Route
            path="/basic-html"
            element={
              <ProtectedRoute>
                <BasicHTML />
              </ProtectedRoute>
            }
          />
          <Route
            path="/basic-css"
            element={
              <ProtectedRoute>
                <BasicCSS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/basic-javascript"
            element={
              <ProtectedRoute>
                <BasicJS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/html-quiz:id"
            element={
              <ProtectedRoute>
                <Html_Quiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/css-quiz/:topic"
            element={
              <ProtectedRoute>
                <Css_Quiz />
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
            path="/assessments"
            element={
              <ProtectedRoute>
                <Challenges />
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
