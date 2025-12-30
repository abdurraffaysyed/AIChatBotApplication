package com.example.demo.Controller;

import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/chat")
public class AIChatController {
    private final ChatClient chatClient;

    public AIChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping("/ask")
    @Async
    public CompletableFuture<Map<String, String>> askAi(@RequestBody Map<String, String> payload) {
        // Extract the user's message from the JSON body
        String userMessage = payload.get("message");

        // Invoke the local Llama 3 model
        String response = chatClient.prompt()
                .user(userMessage)
                .call()
                .content();

        // Return the response as JSON
        return CompletableFuture.completedFuture(Map.of("answer", response));
    }

}
