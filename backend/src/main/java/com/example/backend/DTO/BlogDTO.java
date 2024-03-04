package com.example.backend.DTO;

import com.example.backend.Comment.CommentEntity;
import com.example.backend.User.UserEntity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class BlogDTO {
    private Long id;

    private String title;

    private String description;

    private LocalDateTime date;

    private UserEntity author;

    private Set<Long> views;

    private List<CommentEntity> comments;


}
