package com.example.backend.Conversation;

import com.example.backend.Blog.BlogEntity;
import com.example.backend.Comment.CommentEntity;
import com.example.backend.Message.MessageEntity;
import com.example.backend.User.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.apache.catalina.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MessageEntity> messages = new ArrayList<MessageEntity>();

    @ManyToMany(mappedBy = "conversations", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<UserEntity> conversationParticipants = new HashSet<>();

    LocalDateTime date;

    String participant1;

    String participant2;

    public ConversationEntity () {
    }

    public ConversationEntity(String sender, String recipient) {
//        conversationParticipants.add(sender);
//        conversationParticipants.add(recipient);
        this.participant1 = sender;
        this.participant2 = recipient;
        this.date = LocalDateTime.now();

    }

    public Long getId() {
        return id;
    }

    public List<MessageEntity> getMessages() {
        return messages;
    }

//    public Set<UserEntity> getUsers() {
//        return conversationParticipants;
//    }

    public String getParticipant1() {
        return participant1;
    }

    public String getParticipant2() {
        return participant2;
    }

    public LocalDateTime getDate() {
        return date;
    }

}
