package com.example.backend.Blog;
import com.example.backend.RequestParams.CommentRequest;
import com.example.backend.RequestParams.CreateBlogRequest;
import com.example.backend.RequestParams.EditBlogRequest;
import com.example.backend.RequestParams.ViewBlogRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/blog")
@CrossOrigin
public class BlogController {

    BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public Iterable<BlogEntity> loadBlogs() {
        return blogService.getBlogs();
    }

    @PostMapping("/create")
    public Iterable<BlogEntity> createBlog(@RequestBody CreateBlogRequest request) {
        return blogService.createBlog(request);
    }

    @PostMapping("/view")
    public BlogEntity viewBlog(@RequestBody ViewBlogRequest request) {
        return blogService.viewBlog(request);
    }

    @PostMapping("/comment")
    public BlogEntity createComment(@RequestBody CommentRequest request) {
        System.out.println("comment controller");
        return blogService.createComment(request);
    }

    @DeleteMapping("/{blogID}")
    public void deleteBlog(@PathVariable Long blogID) {

        blogService.deleteBlog(blogID);
    }

    @PostMapping("/edit")
    public Iterable<BlogEntity> editBlog(@RequestBody EditBlogRequest request) {

        return blogService.editBlog(request);
    }


}
