package com.example.backend.Blog;

import com.example.backend.User.UserEntity;
import org.springframework.data.repository.CrudRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface BlogRepository extends CrudRepository<BlogEntity, Long> {
//    Optional<BlogEntity> findBlogEntityByUser(UserEntity)
}
