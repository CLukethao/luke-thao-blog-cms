import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {BlogInterface, BlogListInterface} from "../../interfaces/blog.interface";
import {NewBlogInterface} from "../../interfaces/newBlog.interface";
import {NotificationInterface} from "../../interfaces/notification.interface";
import {EditBlogInterface} from "../../interfaces/editBlog.interface";


export const loadBlogs = createActionGroup({
  source: "loadBlogs",
  events: {
    "load Blogs": emptyProps,
    "load Blogs Fail": props<{error: string}>(),
    "load Blogs Success": props<BlogListInterface>()
  }
})


export const createBlog = createActionGroup({
  source: "createBlog",
  events: {
    "create Blog": props<NewBlogInterface>(),
    "create Blog Fail": props<{error: string}>(),
    "create Blog Success": props<BlogListInterface>()
  }
})

export const viewBlog = createActionGroup({
  source: "viewBlog",
  events: {
    "view Blog": props<{userId: number, blogId: number}>(),
    "view Blog Fail": props<{error: string}>(),
    "view Blog Success": props<BlogInterface>()
  }
})

export const createComment = createActionGroup({
  source: "createComment",
  events: {
    "create Comment": props<{userId: number, blogId: number, comment: string}>(),
    "create Comment Fail": props<{error: string}>(),
    "create Comment Success": props<BlogInterface>()
  }
})

export const deleteBlog = createActionGroup({
  source: "deleteBlog",
  events: {
    "delete Blog": props<{blogId: number}>(),
    "delete Blog Fail": props<{error: string}>(),
    "delete Blog Success": props<NotificationInterface>()
  }
})

export const editBlog = createActionGroup({
  source: "editBlog",
  events: {
    "edit Blog": props<EditBlogInterface>(),
    "edit Blog Fail": props<{error: string}>(),
    "edit Blog Success": props<BlogListInterface>()
  }
})
