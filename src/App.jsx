import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/ui/Loading";
import AdminLayout from "./layout/AdminLayout"; // Import your layout

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
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
import Login from "./admin/admin_auth/Login";
function App() {
  return (
    <div className="App font-SpaceGrotesk text-zinc-950 bg-white">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/assessments" element={<Challenges />} />
          <Route path="/online-resources" element={<OnlineResources />} />
          <Route
            path="/basic-level-html/resources=online"
            element={<BasicLevelHTML />}
          />
          <Route path="/basic-level-css" element={<BasicLevelCSS />} />
          <Route path="/intermediate-level" element={<IntermediateLevel />} />
          <Route path="/advanced-level" element={<AdvancedLevel />} />
          <Route path="/qoutes" element={<LoadingQoutes />} />
          <Route path="/students-previlege" element={<Previlege />} />
          <Route path="/quiz-preview" element={<QuizPreview />} />
          {/* Admin routes */}

          <Route path="/admin/login" element={<Login />} />
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
