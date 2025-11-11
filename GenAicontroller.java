package com.ai.SpringAIDemo;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;

@RestController
public class GenAicontroller {

    private final Chatservice chatservice;
    private final Imageservice imageservice;
    private final RecipeService recipeService;

    public GenAicontroller(Chatservice chatservice, Imageservice imageservice, RecipeService recipeService) {
        this.chatservice = chatservice;
        this.imageservice = imageservice;
        this.recipeService = recipeService;
    }

    @GetMapping("/api/ask")
    public String getResponse(@RequestParam String prompt) {
        return chatservice.getResponse(prompt);
    }

    @GetMapping("/api/ask-options")
    public String getResponseoptions(@RequestParam String prompt) {
        return chatservice.getResponseoptions(prompt);
    }

    @GetMapping("/api/generate-image")
    public void generateImages(HttpServletResponse response,
                               @RequestParam String prompt,
                               @RequestParam(defaultValue = "HD") String quality,
                               @RequestParam(defaultValue = "1") int n,
                               @RequestParam(defaultValue = "1024") int width,
                               @RequestParam(defaultValue = "1024") int height
    ) throws IOException {
        ImageResponse imageResponse = imageservice.generateImage(prompt, quality, n, width, height);

        // ✅ Compatible with latest Spring AI versions
        if (imageResponse != null && imageResponse.getResult() != null) {
            String imageUrl = imageResponse.getResult().getOutput().getUrl();
            response.sendRedirect(imageUrl);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "No image generated");
        }
    }

    @GetMapping("/api/recipe")
    public String recipecreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "any") String cuisine,
                                @RequestParam(defaultValue = "") String dietaryRestrictions) {
        return recipeService.CreateRecipe(ingredients, cuisine, dietaryRestrictions);
    }
}
