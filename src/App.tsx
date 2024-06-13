import MainLayout from "@/components/layouts/main-layout";
import BankManagement from "@/features/bank-management";
import Dashboard from "@/features/dashboard/dashboard";
import HotelManagement from "@/features/hotel-managment";
import LoginPage from "@/features/login/login";
import TestManagement from "@/features/test-management";
import UserManagement from "@/features/user-management";
import UserDetailPage from "@/features/user-management/pages/user-detail";
import React from "react";
import { Route, Routes } from "react-router-dom";
import TestDetail from "./features/test-management/pages/test-detail";
import AddQuestionPage from "./features/test-management/pages/add-question";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="users">
          <Route path=":userId" element={<UserDetailPage />} />
          <Route index element={<UserManagement />} />
        </Route>
        <Route path="banks">
          <Route index element={<BankManagement />} />
        </Route>
        <Route path="hotels">
          <Route index element={<HotelManagement />} />
        </Route>
        <Route path="tests">
          <Route index element={<TestManagement />} />
          <Route path=":testId" element={<TestDetail />} />
        </Route>
        <Route path="questions">
          <Route path="add" element={<AddQuestionPage />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
