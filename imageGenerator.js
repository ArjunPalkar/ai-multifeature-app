import React, { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImage = async() => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImages([]);

        try {
            const response = await fetch(`http://localhost:8080/api/generate-image?prompt=${encodeURIComponent(prompt)}`);
            const urls = await response.json();
            setImages(urls);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = "tab-page" >
        <
        h2 > AI Image Generator < /h2>

        <
        div className = "input-group" >
        <
        input type = "text"
        value = { prompt }
        onChange = {
            (e) => setPrompt(e.target.value) }
        placeholder = "Enter your creative image idea..." /
        >
        <
        button onClick = { generateImage } > Generate Image < /button> <
        /div>

        {
            loading ? ( <
                p className = "loading" > Generating magic... < /p>
            ) : ( <
                div className = "image-grid" > {
                    images.length > 0 ? (
                        images.map((url, index) => ( <
                            img key = { index }
                            src = { url }
                            alt = { `Generated ${index}` }
                            className = "generated-img" / >
                        ))
                    ) : ( <
                        p className = "empty-state" > No images yet.Try a prompt! < /p>
                    )
                } <
                /div>
            )
        } <
        /div>
    );
}

export default ImageGenerator;