import React, { useState } from "react";
import "./App.css";

import Chat from "./chat";
import ImageGenerator from './imageGenerator';
import RecipeGenerator from "./RecipeGenerator";



function App() {
    const [activeTab, setActiveTab] = useState("image-generator");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return ( <
        div className = "app-container" >
        <
        h1 className = "title" > AI Multi - Tool Hub < /h1>

        <
        div className = "tab-buttons" >
        <
        button className = { activeTab === "image-generator" ? "active" : "" }
        onClick = {
            () => handleTabChange("image-generator") } >
        Image Generator <
        /button> <
        button className = { activeTab === "chat" ? "active" : "" }
        onClick = {
            () => handleTabChange("chat") } >
        Chat <
        /button> <
        button className = { activeTab === "recipe-generator" ? "active" : "" }
        onClick = {
            () => handleTabChange("recipe-generator") } >
        Recipe Generator <
        /button> <
        /div>

        <
        div className = "tab-content" > { activeTab === "image-generator" && < ImageGenerator / > } { activeTab === "chat" && < Chat / > } { activeTab === "recipe-generator" && < RecipeGenerator / > } <
        /div> <
        /div>
    );
}

export default App;