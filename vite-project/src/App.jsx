import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks";
import DeleteBooks from "./pages/DeleteBooks";
import EditBooks from "./pages/EditBooks";
import ShowBooks from "./pages/ShowBooks";
import HomePage from "./pages/HomePage";
import FilterBooks from "./pages/FilterBooks";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/books/create" element={<CreateBooks />} />
    <Route path="/books/delete/:id" element={<DeleteBooks />} />
    <Route path="/books/details/:id" element={<ShowBooks />} />
    <Route path="/books/edit/:id" element={<EditBooks />} />
    <Route path="/books/filter" element={<FilterBooks/>} />
  </Routes>
);

export default App;
