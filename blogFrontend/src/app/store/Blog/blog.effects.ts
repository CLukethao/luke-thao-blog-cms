import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {catchError, exhaustMap, map, of, switchMap, tap} from "rxjs";
import {UserInterface} from "../../interfaces/user.interface";
import {userSignUp} from "../User/user.actions";
import {createBlog, createComment, deleteBlog, editBlog, loadBlogs, viewBlog} from "./blog.actions";
import {BlogInterface, BlogListInterface} from "../../interfaces/blog.interface";
import {MatDialog} from "@angular/material/dialog";


@Injectable()
export class BlogEffects {

  constructor(private actions$: Actions, private service: HttpService, private router: Router, private matDialog: MatDialog) {
  }

  loadBlogs = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogs.loadBlogs),
      exhaustMap((props) => {
        return this.service.loadBlogs().pipe(
          map((data: BlogInterface[]) => {
            return loadBlogs.loadBlogsSuccess({blogs: data})
          }),
          catchError((error) => of(loadBlogs.loadBlogsFail({error: error})))
        )
      })
    )
  );

  createBlog = createEffect(() =>
    this.actions$.pipe(
      ofType(createBlog.createBlog),
      exhaustMap((props) => {
        return this.service.createBlog(props).pipe(
          map((data: BlogInterface[]) => {
            this.matDialog.closeAll()
            return createBlog.createBlogSuccess({blogs: data})
          }),
          catchError((error) => of(createBlog.createBlogFail({error: error})))
        )
      })
    )
  );

  viewBlog = createEffect(() =>
    this.actions$.pipe(
      ofType(viewBlog.viewBlog),
      exhaustMap((props) => {
        return this.service.viewBlog(props).pipe(
          map((data: BlogInterface) => {
            return viewBlog.viewBlogSuccess(data)
          }),
          catchError((error) => of(viewBlog.viewBlogFail({error: error})))
        )
      })
    )
  );

  createComment = createEffect(() =>
    this.actions$.pipe(
      ofType(createComment.createComment),
      exhaustMap((props) => {
        return this.service.createComment(props).pipe(
          map((data: BlogInterface) => {
            console.log(data)
            return createComment.createCommentSuccess(data)
          }),
          catchError((error) => of(createComment.createCommentFail({error: error})))
        )
      })
    )
  );

  deleteBlog = createEffect(() => this.actions$.pipe(
    ofType(deleteBlog.deleteBlog),
    switchMap(action =>
      this.service.deleteBlog(action).pipe(
        tap(() => this.router.navigate(["/blog"])),
        map(() => deleteBlog.deleteBlogSuccess({ message: 'Blog deleted successfully', notification: "success" })),
        catchError(error => of(deleteBlog.deleteBlogFail({ error: 'Failed to delete blog' })))
      )
    )
  ));

  // deleteBlog = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(deleteBlog.deleteBlog),
  //     exhaustMap((props) => {
  //       return this.service.deleteBlog(props).pipe(
  //         map((data: BlogInterface[]) => {
  //           console.log(data)
  //           return deleteBlog.deleteBlogSuccess({blogs: data})
  //         }),
  //         catchError((error) => of(deleteBlog.deleteBlogFail({error: error})))
  //       )
  //     })
  //   )
  // );

  editBlog = createEffect(() =>
    this.actions$.pipe(
      ofType(editBlog.editBlog),
      exhaustMap((props) => {
        return this.service.editBlog(props).pipe(
          map((data: BlogInterface[]) => {
            this.matDialog.closeAll();
            return editBlog.editBlogSuccess({blogs: data})
          }),
          catchError((error) => of(editBlog.editBlogFail({error: error})))
        )
      })
    )
  );



}
