import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BlogInterface, BlogListInterface} from "../../interfaces/blog.interface";

const getBlogState = createFeatureSelector<BlogListInterface>('blog');

export const getBlogs = createSelector(getBlogState, (state) => {

  return state.blogs

});

export const getBlogById = (blogId: number) => createSelector(getBlogState, (state) => {

  return state.blogs.find((blog:BlogInterface) => blogId === blog.id) as BlogInterface

})

export const getBlogsByUser = (user: string) => createSelector(getBlogState, (state) => {

  // const blogs: BlogInterface[] = state.blogs.map((blog:BlogInterface) => {
  //   if (blog.author.username === user) {
  //     return blog;
  //   }
  //
  //   else return;
  // })

  return state.blogs.map((blog:BlogInterface) => {
      if (blog.author.username === user) {
        return blog;
      }

      else return;
  });

})
