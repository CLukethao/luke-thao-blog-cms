package com.example.backend.User;

import com.example.backend.Conversation.ConversationEntity;
import com.example.backend.RequestParams.MessageRequest;
import com.example.backend.RequestParams.UserRequest;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public UserEntity create(@RequestBody UserRequest requestBody) {

       return userService.create(requestBody.username, requestBody.password);
    }

    @PostMapping("/login")
    public UserEntity login(@RequestBody UserRequest requestBody) {
        return userService.login(requestBody.username, requestBody.password);
    }

    @GetMapping("/community")
    public Iterable<UserEntity> getCommunity() {
        return userService.getCommunity();
    }

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable Long id) {

        return userService.getUser(id);
    }
}
