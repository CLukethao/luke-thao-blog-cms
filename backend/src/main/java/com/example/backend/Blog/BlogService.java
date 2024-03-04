package com.example.backend.Blog;

import com.example.backend.Comment.CommentEntity;
import com.example.backend.Comment.CommentRepository;
import com.example.backend.RequestParams.CommentRequest;
import com.example.backend.RequestParams.CreateBlogRequest;
import com.example.backend.RequestParams.EditBlogRequest;
import com.example.backend.RequestParams.ViewBlogRequest;
import com.example.backend.User.UserEntity;
import com.example.backend.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BlogService {

    BlogRepository blogRepository;
    UserRepository userRepository;
    CommentRepository commentRepository;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository, CommentRepository commentRepository) {this.blogRepository = blogRepository; this.userRepository = userRepository; this.commentRepository = commentRepository;}

    public Iterable<BlogEntity> getBlogs() {
        return blogRepository.findAll();
    }

    public Iterable<BlogEntity> createBlog(CreateBlogRequest request) {
        Optional<UserEntity> userExists = userRepository.findByUsernameIgnoreCase(request.author);

        if (userExists.isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        BlogEntity blog = new BlogEntity(request.title, request.description, userExists.get(), request.backgroundColor, request.fontColor, request.fontSize, request.fontStyle);

        blogRepository.save(blog);

        return blogRepository.findAll();
    }

    public BlogEntity viewBlog(ViewBlogRequest request) {

        Optional<UserEntity> userExists = userRepository.findById(request.userId);
        Optional<BlogEntity> blogExists = blogRepository.findById(request.blogId);

        if (blogExists.isEmpty()) {

            System.out.println("blog dont exist");
            System.out.println(request.userId);

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (userExists.isEmpty()) {
            System.out.println("user dont exist");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        }

        UserEntity user = userExists.get();
        BlogEntity blog = blogExists.get();

        blog.views.add(user);

        blogRepository.save(blog);

        return blog;
    }

    public BlogEntity createComment(CommentRequest request) {

        Optional<UserEntity> userExists = userRepository.findById(request.userId);
        Optional<BlogEntity> blogExists = blogRepository.findById(request.blogId);

        if (blogExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (userExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity user = userExists.get();
        BlogEntity blog = blogExists.get();

        CommentEntity comment = new CommentEntity(request.comment, user, blog);

        blog.comments.add(comment);

        blogRepository.save(blog);

        System.out.println(comment);

        System.out.println(blog);

        return blog;

    }

    public void deleteBlog(Long blogId) {
        Optional<BlogEntity> blogExists = blogRepository.findById(blogId);

        if (blogExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        blogRepository.deleteById(blogId);

    }


    public Iterable<BlogEntity> editBlog(EditBlogRequest request) {

        if (verifyUserExistence(request.authorId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (verifyBlogExistence(request.blogId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        BlogEntity blog = blogRepository.findById(request.blogId).get();

        blog.title = request.title;
        blog.description = request.title;
        blog.date = LocalDateTime.now();

        blogRepository.save(blog);

        return blogRepository.findAll();
    }


    public boolean verifyUserExistence(Long userId) {
        Optional<UserEntity> userExists = userRepository.findById(userId);

        return userExists.isEmpty();
    }

    public boolean verifyBlogExistence(Long blogId) {
        Optional<BlogEntity> blogExists = blogRepository.findById(blogId);

        return blogExists.isEmpty();
    }
}
