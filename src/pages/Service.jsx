import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Speech from "./services/Speech";
import Occupational from "./services/Occupational";

const Service = () => {
  const location = useLocation();
  const path = location.pathname
    .split("/")
    .pop()
    .toLowerCase()
    .replace("-", " ");

  const renderContent = () => {
    switch (path) {
      case "speech therapy":
        return <Speech />;
      case "occupational therapy":
        return <Occupational />;
      default:
        return <p>{path}</p>;
    }
  };

  const renderDescription = () => {
    switch (path) {
      case "speech therapy":
        return "Speech & Language";
      case "occupational therapy":
        return "Occupational";
      case "behavioral therapy":
        return "Pediatric Behavioural";
      case "physiotherapy":
        return "Physical & Language";
      default:
        return "";
    }
  };

  return (
    <div>
      <Navbar />
      <Header color={"#fee"}>
        <h1 className="text-4xl font-bold  mb-4">{path}</h1>
        <p>{renderDescription()} Therapy Center for Children in Hyderabad</p>
      </Header>

      {renderContent()}
    </div>
  );
};

export default Service;
