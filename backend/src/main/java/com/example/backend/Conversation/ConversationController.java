package com.example.backend.Conversation;

import com.example.backend.RequestParams.ConversationRequest;
import com.example.backend.RequestParams.MessageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/conversation")
@CrossOrigin
public class ConversationController {

    ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("/new")
    public Iterable<ConversationEntity> createConversation(@RequestBody ConversationRequest request) {
        return conversationService.createConversation(request);
    }

    @PostMapping("/message")
    public Iterable<ConversationEntity> sendMessage(@RequestBody MessageRequest request) {

        return conversationService.sendMessage(request);
    }


}
