package com.example.backend.Message;

import com.example.backend.Conversation.ConversationEntity;
import com.example.backend.User.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    String message;

    LocalDateTime date;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "UserEntity_id")
//    UserEntity user;
    String author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ConversationEntity_id")
    ConversationEntity conversation;


    public MessageEntity() {

    }

    public MessageEntity(String message, String sender, ConversationEntity conversation) {
        this.message = message;
        this.author = sender;
        this.conversation = conversation;
        this.date = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getAuthor() {
        return author;
    }

    public Long getConversationId() {
        return conversation.getId();
    }

}
