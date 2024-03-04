package com.example.backend.DTO;

import com.example.backend.User.UserEntity;
import org.apache.catalina.User;

public class CommentDTO {

    UserEntity userEntity;

    public CommentDTO(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public String description;

    public String user = userEntity.getUsername();

}
