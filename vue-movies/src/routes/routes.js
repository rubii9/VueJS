import PopularView from "@/views/PopularView";
import SearchView from "@/views/SearchView";
import FavouriteView from "@/views/FavouriteView";
import MovieView from "@/views/MovieView";
import NotFound404View from "@/views/NotFound404View";
import MovieDetail from "@/components/movies/MovieDetail";
import MovieCast from "@/components/movies/MovieCast";

export default [
  {
    path: '/',
    redirect: {name: 'popular'}
  },
  {
    path: '/popular',
    name: 'popular',
    component: PopularView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    props: route => {
      if (!route.query) { return {} }
      return {
        year: route.query.year,
        searchTerm: route.query.search
      }
    },
  },
  {
    path: '/favourite',
    name: 'favourite',
    component: FavouriteView
  },
  {
    path: '/movie/:id',
    component: MovieView,
    props: true,
    children: [
      {
        path: '',
        name: 'movie',
        component: MovieDetail,
        props: true,
      },
      {
        path: 'cast',
        name: 'cast',
        component: MovieCast,
        props: true,
      }
    ],
    // beforeEnter: (to, from, next) => {
    //   if (to.params.id.toString() === "464052") {
    //     next(false)
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/other-movie/:movieID',
    name: 'other-movie',
    component: MovieView,
    props: (route) => {
      return {
        id: route.params.movieID
      }
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound404View
  },
]