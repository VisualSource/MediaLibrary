/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedRootImport } from './routes/_authenticated/_root'
import { Route as AuthenticatedRootIndexImport } from './routes/_authenticated/_root/index'
import { Route as AuthenticatedRootSeriesImport } from './routes/_authenticated/_root/series'
import { Route as AuthenticatedRootSearchImport } from './routes/_authenticated/_root/search'
import { Route as AuthenticatedRootMoviesImport } from './routes/_authenticated/_root/movies'
import { Route as AuthenticatedRootBookmarkedImport } from './routes/_authenticated/_root/bookmarked'
import { Route as AuthenticatedRootAccountImport } from './routes/_authenticated/_root/account'

// Create Virtual Routes

const SignupLazyImport = createFileRoute('/signup')()
const LogoutLazyImport = createFileRoute('/logout')()
const LoginLazyImport = createFileRoute('/login')()

// Create/Update Routes

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const LogoutLazyRoute = LogoutLazyImport.update({
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/logout.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRootRoute = AuthenticatedRootImport.update({
  id: '/_root',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedRootIndexRoute = AuthenticatedRootIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRootRoute,
} as any)

const AuthenticatedRootSeriesRoute = AuthenticatedRootSeriesImport.update({
  path: '/series',
  getParentRoute: () => AuthenticatedRootRoute,
} as any)

const AuthenticatedRootSearchRoute = AuthenticatedRootSearchImport.update({
  path: '/search',
  getParentRoute: () => AuthenticatedRootRoute,
} as any)

const AuthenticatedRootMoviesRoute = AuthenticatedRootMoviesImport.update({
  path: '/movies',
  getParentRoute: () => AuthenticatedRootRoute,
} as any)

const AuthenticatedRootBookmarkedRoute =
  AuthenticatedRootBookmarkedImport.update({
    path: '/bookmarked',
    getParentRoute: () => AuthenticatedRootRoute,
  } as any)

const AuthenticatedRootAccountRoute = AuthenticatedRootAccountImport.update({
  path: '/account',
  getParentRoute: () => AuthenticatedRootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      preLoaderRoute: typeof LogoutLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_root': {
      preLoaderRoute: typeof AuthenticatedRootImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_root/account': {
      preLoaderRoute: typeof AuthenticatedRootAccountImport
      parentRoute: typeof AuthenticatedRootImport
    }
    '/_authenticated/_root/bookmarked': {
      preLoaderRoute: typeof AuthenticatedRootBookmarkedImport
      parentRoute: typeof AuthenticatedRootImport
    }
    '/_authenticated/_root/movies': {
      preLoaderRoute: typeof AuthenticatedRootMoviesImport
      parentRoute: typeof AuthenticatedRootImport
    }
    '/_authenticated/_root/search': {
      preLoaderRoute: typeof AuthenticatedRootSearchImport
      parentRoute: typeof AuthenticatedRootImport
    }
    '/_authenticated/_root/series': {
      preLoaderRoute: typeof AuthenticatedRootSeriesImport
      parentRoute: typeof AuthenticatedRootImport
    }
    '/_authenticated/_root/': {
      preLoaderRoute: typeof AuthenticatedRootIndexImport
      parentRoute: typeof AuthenticatedRootImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedRootRoute.addChildren([
      AuthenticatedRootAccountRoute,
      AuthenticatedRootBookmarkedRoute,
      AuthenticatedRootMoviesRoute,
      AuthenticatedRootSearchRoute,
      AuthenticatedRootSeriesRoute,
      AuthenticatedRootIndexRoute,
    ]),
  ]),
  LoginLazyRoute,
  LogoutLazyRoute,
  SignupLazyRoute,
])

/* prettier-ignore-end */
