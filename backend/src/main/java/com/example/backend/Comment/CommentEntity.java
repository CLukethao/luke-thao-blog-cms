package com.example.backend.Comment;

import com.example.backend.Blog.BlogEntity;
import com.example.backend.User.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    String comment;

    LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserEntity_id")
    UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BlogEntity_id")
    BlogEntity blog;

    public CommentEntity (String comment, UserEntity user, BlogEntity blog) {
        this.comment = comment;
        this.user = user;
        this.blog = blog;
        this.date = LocalDateTime.now();
    }

    public CommentEntity() {

    }

    public Long getId() {return id;}
    public String getComment() {return comment;}
    public LocalDateTime getDate() {return date;}
    public String getUser() {return user.getUsername();}
    public Long getBlogId() {return blog.getId();}

}
