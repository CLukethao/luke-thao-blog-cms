package com.example.backend.User;

import com.example.backend.Blog.BlogEntity;
import com.example.backend.Comment.CommentEntity;
//import com.example.backend.Message.MessageEntity;
import com.example.backend.Conversation.ConversationEntity;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    String username;

    String password;

    @ManyToMany(mappedBy = "views", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<BlogEntity> blogsViewed = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "conversationParticipants",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "conversation_id")
    )
    @JsonManagedReference
    public Set<ConversationEntity> conversations = new HashSet<>();

//    @ElementCollection
//    public Set<ConversationEntitzzszy> conversations = new HashSet<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    List<BlogEntity> blogs = new ArrayList<BlogEntity>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<CommentEntity> comments = new ArrayList<CommentEntity>();



    public UserEntity() {
    }

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Set<ConversationEntity> getConversations() {
        return conversations;
    }
}
