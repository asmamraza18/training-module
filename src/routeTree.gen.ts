/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TrainingImport } from './routes/training'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AuthImport } from './routes/auth'
import { Route as TrainingModuleSelectionImport } from './routes/training/module-selection'
import { Route as ModuleModuleIdImport } from './routes/module/$moduleId'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const TrainingRoute = TrainingImport.update({
  path: '/training',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TrainingModuleSelectionRoute = TrainingModuleSelectionImport.update({
  path: '/module-selection',
  getParentRoute: () => TrainingRoute,
} as any)

const ModuleModuleIdRoute = ModuleModuleIdImport.update({
  path: '/module/$moduleId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/training': {
      id: '/training'
      path: '/training'
      fullPath: '/training'
      preLoaderRoute: typeof TrainingImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/module/$moduleId': {
      id: '/module/$moduleId'
      path: '/module/$moduleId'
      fullPath: '/module/$moduleId'
      preLoaderRoute: typeof ModuleModuleIdImport
      parentRoute: typeof rootRoute
    }
    '/training/module-selection': {
      id: '/training/module-selection'
      path: '/module-selection'
      fullPath: '/training/module-selection'
      preLoaderRoute: typeof TrainingModuleSelectionImport
      parentRoute: typeof TrainingImport
    }
  }
}

// Create and export the route tree

interface TrainingRouteChildren {
  TrainingModuleSelectionRoute: typeof TrainingModuleSelectionRoute
}

const TrainingRouteChildren: TrainingRouteChildren = {
  TrainingModuleSelectionRoute: TrainingModuleSelectionRoute,
}

const TrainingRouteWithChildren = TrainingRoute._addFileChildren(
  TrainingRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/training': typeof TrainingRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/module/$moduleId': typeof ModuleModuleIdRoute
  '/training/module-selection': typeof TrainingModuleSelectionRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/training': typeof TrainingRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/module/$moduleId': typeof ModuleModuleIdRoute
  '/training/module-selection': typeof TrainingModuleSelectionRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/training': typeof TrainingRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/module/$moduleId': typeof ModuleModuleIdRoute
  '/training/module-selection': typeof TrainingModuleSelectionRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/login'
    | '/training'
    | '/about'
    | '/module/$moduleId'
    | '/training/module-selection'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/login'
    | '/training'
    | '/about'
    | '/module/$moduleId'
    | '/training/module-selection'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/login'
    | '/training'
    | '/about'
    | '/module/$moduleId'
    | '/training/module-selection'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRoute
  DashboardRoute: typeof DashboardRoute
  LoginRoute: typeof LoginRoute
  TrainingRoute: typeof TrainingRouteWithChildren
  AboutLazyRoute: typeof AboutLazyRoute
  ModuleModuleIdRoute: typeof ModuleModuleIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRoute,
  DashboardRoute: DashboardRoute,
  LoginRoute: LoginRoute,
  TrainingRoute: TrainingRouteWithChildren,
  AboutLazyRoute: AboutLazyRoute,
  ModuleModuleIdRoute: ModuleModuleIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/dashboard",
        "/login",
        "/training",
        "/about",
        "/module/$moduleId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/training": {
      "filePath": "training.tsx",
      "children": [
        "/training/module-selection"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/module/$moduleId": {
      "filePath": "module/$moduleId.tsx"
    },
    "/training/module-selection": {
      "filePath": "training/module-selection.tsx",
      "parent": "/training"
    }
  }
}
ROUTE_MANIFEST_END */
