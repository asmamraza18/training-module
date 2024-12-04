/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TrainingHandbookImport } from './routes/trainingHandbook'
import { Route as TrainingImport } from './routes/training'
import { Route as ProgramOverviewImport } from './routes/programOverview'
import { Route as LearningObjectiveImport } from './routes/learningObjective'
import { Route as FaqImport } from './routes/faq'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AuthImport } from './routes/auth'
import { Route as ModuleIndexImport } from './routes/module/index'
import { Route as ModuleModuleIdIndexImport } from './routes/module/$moduleId/index'
import { Route as ModuleModuleIdTraningIdIndexImport } from './routes/module/$moduleId/$traningId/index'
import { Route as ModuleModuleIdTraningIdQuizImport } from './routes/module/$moduleId/$traningId/quiz'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const TrainingHandbookRoute = TrainingHandbookImport.update({
  path: '/trainingHandbook',
  getParentRoute: () => rootRoute,
} as any)

const TrainingRoute = TrainingImport.update({
  path: '/training',
  getParentRoute: () => rootRoute,
} as any)

const ProgramOverviewRoute = ProgramOverviewImport.update({
  path: '/programOverview',
  getParentRoute: () => rootRoute,
} as any)

const LearningObjectiveRoute = LearningObjectiveImport.update({
  path: '/learningObjective',
  getParentRoute: () => rootRoute,
} as any)

const FaqRoute = FaqImport.update({
  path: '/faq',
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

const ModuleIndexRoute = ModuleIndexImport.update({
  path: '/module/',
  getParentRoute: () => rootRoute,
} as any)

const ModuleModuleIdIndexRoute = ModuleModuleIdIndexImport.update({
  path: '/module/$moduleId/',
  getParentRoute: () => rootRoute,
} as any)

const ModuleModuleIdTraningIdIndexRoute =
  ModuleModuleIdTraningIdIndexImport.update({
    path: '/module/$moduleId/$traningId/',
    getParentRoute: () => rootRoute,
  } as any)

const ModuleModuleIdTraningIdQuizRoute =
  ModuleModuleIdTraningIdQuizImport.update({
    path: '/module/$moduleId/$traningId/quiz',
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
    '/faq': {
      id: '/faq'
      path: '/faq'
      fullPath: '/faq'
      preLoaderRoute: typeof FaqImport
      parentRoute: typeof rootRoute
    }
    '/learningObjective': {
      id: '/learningObjective'
      path: '/learningObjective'
      fullPath: '/learningObjective'
      preLoaderRoute: typeof LearningObjectiveImport
      parentRoute: typeof rootRoute
    }
    '/programOverview': {
      id: '/programOverview'
      path: '/programOverview'
      fullPath: '/programOverview'
      preLoaderRoute: typeof ProgramOverviewImport
      parentRoute: typeof rootRoute
    }
    '/training': {
      id: '/training'
      path: '/training'
      fullPath: '/training'
      preLoaderRoute: typeof TrainingImport
      parentRoute: typeof rootRoute
    }
    '/trainingHandbook': {
      id: '/trainingHandbook'
      path: '/trainingHandbook'
      fullPath: '/trainingHandbook'
      preLoaderRoute: typeof TrainingHandbookImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/module/': {
      id: '/module/'
      path: '/module'
      fullPath: '/module'
      preLoaderRoute: typeof ModuleIndexImport
      parentRoute: typeof rootRoute
    }
    '/module/$moduleId/': {
      id: '/module/$moduleId/'
      path: '/module/$moduleId'
      fullPath: '/module/$moduleId'
      preLoaderRoute: typeof ModuleModuleIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/module/$moduleId/$traningId/quiz': {
      id: '/module/$moduleId/$traningId/quiz'
      path: '/module/$moduleId/$traningId/quiz'
      fullPath: '/module/$moduleId/$traningId/quiz'
      preLoaderRoute: typeof ModuleModuleIdTraningIdQuizImport
      parentRoute: typeof rootRoute
    }
    '/module/$moduleId/$traningId/': {
      id: '/module/$moduleId/$traningId/'
      path: '/module/$moduleId/$traningId'
      fullPath: '/module/$moduleId/$traningId'
      preLoaderRoute: typeof ModuleModuleIdTraningIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/faq': typeof FaqRoute
  '/learningObjective': typeof LearningObjectiveRoute
  '/programOverview': typeof ProgramOverviewRoute
  '/training': typeof TrainingRoute
  '/trainingHandbook': typeof TrainingHandbookRoute
  '/about': typeof AboutLazyRoute
  '/module': typeof ModuleIndexRoute
  '/module/$moduleId': typeof ModuleModuleIdIndexRoute
  '/module/$moduleId/$traningId/quiz': typeof ModuleModuleIdTraningIdQuizRoute
  '/module/$moduleId/$traningId': typeof ModuleModuleIdTraningIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/faq': typeof FaqRoute
  '/learningObjective': typeof LearningObjectiveRoute
  '/programOverview': typeof ProgramOverviewRoute
  '/training': typeof TrainingRoute
  '/trainingHandbook': typeof TrainingHandbookRoute
  '/about': typeof AboutLazyRoute
  '/module': typeof ModuleIndexRoute
  '/module/$moduleId': typeof ModuleModuleIdIndexRoute
  '/module/$moduleId/$traningId/quiz': typeof ModuleModuleIdTraningIdQuizRoute
  '/module/$moduleId/$traningId': typeof ModuleModuleIdTraningIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/auth': typeof AuthRoute
  '/dashboard': typeof DashboardRoute
  '/faq': typeof FaqRoute
  '/learningObjective': typeof LearningObjectiveRoute
  '/programOverview': typeof ProgramOverviewRoute
  '/training': typeof TrainingRoute
  '/trainingHandbook': typeof TrainingHandbookRoute
  '/about': typeof AboutLazyRoute
  '/module/': typeof ModuleIndexRoute
  '/module/$moduleId/': typeof ModuleModuleIdIndexRoute
  '/module/$moduleId/$traningId/quiz': typeof ModuleModuleIdTraningIdQuizRoute
  '/module/$moduleId/$traningId/': typeof ModuleModuleIdTraningIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/faq'
    | '/learningObjective'
    | '/programOverview'
    | '/training'
    | '/trainingHandbook'
    | '/about'
    | '/module'
    | '/module/$moduleId'
    | '/module/$moduleId/$traningId/quiz'
    | '/module/$moduleId/$traningId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/faq'
    | '/learningObjective'
    | '/programOverview'
    | '/training'
    | '/trainingHandbook'
    | '/about'
    | '/module'
    | '/module/$moduleId'
    | '/module/$moduleId/$traningId/quiz'
    | '/module/$moduleId/$traningId'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/faq'
    | '/learningObjective'
    | '/programOverview'
    | '/training'
    | '/trainingHandbook'
    | '/about'
    | '/module/'
    | '/module/$moduleId/'
    | '/module/$moduleId/$traningId/quiz'
    | '/module/$moduleId/$traningId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRoute
  DashboardRoute: typeof DashboardRoute
  FaqRoute: typeof FaqRoute
  LearningObjectiveRoute: typeof LearningObjectiveRoute
  ProgramOverviewRoute: typeof ProgramOverviewRoute
  TrainingRoute: typeof TrainingRoute
  TrainingHandbookRoute: typeof TrainingHandbookRoute
  AboutLazyRoute: typeof AboutLazyRoute
  ModuleIndexRoute: typeof ModuleIndexRoute
  ModuleModuleIdIndexRoute: typeof ModuleModuleIdIndexRoute
  ModuleModuleIdTraningIdQuizRoute: typeof ModuleModuleIdTraningIdQuizRoute
  ModuleModuleIdTraningIdIndexRoute: typeof ModuleModuleIdTraningIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRoute,
  DashboardRoute: DashboardRoute,
  FaqRoute: FaqRoute,
  LearningObjectiveRoute: LearningObjectiveRoute,
  ProgramOverviewRoute: ProgramOverviewRoute,
  TrainingRoute: TrainingRoute,
  TrainingHandbookRoute: TrainingHandbookRoute,
  AboutLazyRoute: AboutLazyRoute,
  ModuleIndexRoute: ModuleIndexRoute,
  ModuleModuleIdIndexRoute: ModuleModuleIdIndexRoute,
  ModuleModuleIdTraningIdQuizRoute: ModuleModuleIdTraningIdQuizRoute,
  ModuleModuleIdTraningIdIndexRoute: ModuleModuleIdTraningIdIndexRoute,
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
        "/faq",
        "/learningObjective",
        "/programOverview",
        "/training",
        "/trainingHandbook",
        "/about",
        "/module/",
        "/module/$moduleId/",
        "/module/$moduleId/$traningId/quiz",
        "/module/$moduleId/$traningId/"
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
    "/faq": {
      "filePath": "faq.tsx"
    },
    "/learningObjective": {
      "filePath": "learningObjective.tsx"
    },
    "/programOverview": {
      "filePath": "programOverview.tsx"
    },
    "/training": {
      "filePath": "training.tsx"
    },
    "/trainingHandbook": {
      "filePath": "trainingHandbook.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/module/": {
      "filePath": "module/index.tsx"
    },
    "/module/$moduleId/": {
      "filePath": "module/$moduleId/index.tsx"
    },
    "/module/$moduleId/$traningId/quiz": {
      "filePath": "module/$moduleId/$traningId/quiz.tsx"
    },
    "/module/$moduleId/$traningId/": {
      "filePath": "module/$moduleId/$traningId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
