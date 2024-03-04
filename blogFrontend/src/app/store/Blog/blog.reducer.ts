import {createReducer, on, props} from "@ngrx/store";
import {blogState} from "./blog.state";
import {createBlog, createComment, editBlog, loadBlogs, viewBlog} from "./blog.actions";


export const blogReducer = createReducer(blogState,

  on(loadBlogs.loadBlogsSuccess, (state, props) => {
    return {
      ...state, blogs: props.blogs
    }
  }),

  on(createBlog.createBlogSuccess, (state, props) => {
    return {
      ...state, blogs: props.blogs
    }
  }),

  on(createComment.createCommentSuccess, (state, props) => {
    console.log(props)
    return {
      ...state
    }
  }),

  on(viewBlog.viewBlogSuccess, (state, props) => {
    const updatedBlogs = state.blogs.map(blog => {
      if (blog.id === props.id) {
        return props
      }

      else return blog
    })

    return {
      ...state, blogs: updatedBlogs
    }
  }),

  on(createComment.createCommentSuccess, (state, props) => {
    const updatedBlogs = state.blogs.map(blog => {
      if (blog.id === props.id) {
        return props
      }

      else return blog
    })

    return {
      ...state, blogs: updatedBlogs
    }
  }),

  on(editBlog.editBlogSuccess, (state, props) => {

    return {
      ...state, blogs: props.blogs
    }
  }),




)
