import React, { useState } from "react";

function Chat() {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAi = async() => {
        if (!prompt.trim()) return;
        setLoading(true);
        setChatResponse("");

        try {
            const response = await fetch(`http://localhost:8080/api/ask?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.text();
            setChatResponse(data);
        } catch (error) {
            setChatResponse("⚠️ Error generating response. Check server.");
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = "tab-page" >
        <
        h2 > Talk to AI < /h2> <
        div className = "input-group" >
        <
        input type = "text"
        value = { prompt }
        onChange = {
            (e) => setPrompt(e.target.value) }
        placeholder = "Type your question..." /
        >
        <
        button onClick = { askAi } > Ask AI < /button> <
        /div> { loading ? < p className = "loading" > Thinking... < /p> : <p className="response">{chatResponse}</p > } <
        /div>
    );
}

export default Chat;