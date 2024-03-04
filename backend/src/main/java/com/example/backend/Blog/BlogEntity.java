package com.example.backend.Blog;

import com.example.backend.Comment.CommentEntity;
import com.example.backend.User.UserEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


import java.time.LocalDateTime;
import java.util.*;

@Entity
public class BlogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    String title;

    String description;

    LocalDateTime date;

    String backgroundColor;
    String fontColor;
    String fontSize;
    String fontStyle;

    @ManyToMany
    @JoinTable(name = "seen_by",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonManagedReference
    Set<UserEntity> views = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserEntity_id")
    UserEntity author;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    List<CommentEntity> comments = new ArrayList<CommentEntity>();

    public BlogEntity(String title, String description, UserEntity user, String backgroundColor, String fontColor, String fontSize, String fontStyle) {
        this.title = title;

        this.description = description;

        this.author = user;

        this.date = LocalDateTime.now();

        this.views.add(user);

        this.backgroundColor = backgroundColor;

        this.fontColor = fontColor;

        this.fontSize = fontSize;

        this.fontStyle = fontStyle;

    }


    public BlogEntity() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public Set<UserEntity> getViews() {
        return views;
    }

    public List<CommentEntity> getComments() {return comments; }

    public String getBackgroundColor() {return backgroundColor;}

    public String getFontColor() {return fontColor;}

    public String getFontSize() {return fontSize;}

    public String getFontStyle() {return fontStyle;}
}
