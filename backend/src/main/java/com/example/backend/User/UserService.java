package com.example.backend.User;

import com.example.backend.Conversation.ConversationEntity;
import com.example.backend.RequestParams.MessageRequest;
import jakarta.persistence.Entity;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity create(String username, String password) {

        Optional<UserEntity> userExists = userRepository.findByUsernameIgnoreCase(username);

        if (userExists.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity(username, password);

        userRepository.save(user);

        return user;
    }

    public UserEntity login(String username, String password) {

        Optional<UserEntity> userExists = userRepository.findByUsernameIgnoreCaseAndPassword(username, password);

        if (userExists.isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity user = userExists.get();

        return userExists.get();
    }

    public Iterable<UserEntity> getCommunity() {

        return userRepository.findAll();
    }

    public UserEntity getUser(Long id) {

        Optional<UserEntity> userExists = userRepository.findById(id);

        if (userExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return userExists.get();
    }

}
