import React, { useEffect, useState } from "react";
import $ from "jquery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";

import KanbanApp from "./components/KanbanApp";
import Footer from "./components/Footer";
import ResumeApp from "./components/ResumeApp";

function App() {
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        setResumeData(data);
      },
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }, [setResumeData]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ResumeApp/>} />
          <Route path="/kanban" element={<KanbanApp/>} />
        </Routes>
        <Footer data={resumeData.main} />
      </div>
    </BrowserRouter>
  );
}

export default App;
