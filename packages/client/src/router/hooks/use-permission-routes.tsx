import { Suspense, lazy, useMemo } from 'react';
import { Tag } from 'antd';
import { isEmpty } from 'ramda';
import { Navigate, Outlet } from 'react-router';
import { PermissionType, type MenuEntity } from '@bill/database/esm';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { useUserPermission } from '@/store/userStore';
import { flattenTrees } from '@/utils/tree';

import { getRoutesFromModules } from '../utils';
import type { AppRouteObject } from '#/router';

const ENTRY_PATH = '/src/pages';
const PAGES = import.meta.glob('/src/pages/**/*.tsx');
const loadComponentFromPath = (path: string) => PAGES[`${ENTRY_PATH}${path}`];

/**
 * Build complete route path by traversing from current permission to root
 * @param {Permission} permission - current permission
 * @param {Permission[]} flattenedPermissions - flattened permission array
 * @param {string[]} segments - route segments accumulator
 * @returns {string} normalized complete route path
 */
function buildCompleteRoute(
  permission: MenuEntity,
  flattenedPermissions: MenuEntity[],
  segments: string[] = [],
): string {
  // Add current route segment
  segments.unshift(permission.route);

  // Base case: reached root permission
  if (!permission.parent) {
    return `/${segments.join('/')}`;
  }

  permission.parentId = permission.parent.id;

  // Find parent and continue recursion
  const parent = flattenedPermissions.find((p) => p.id === permission.parentId);
  if (!parent) {
    console.warn(`Parent permission not found for ID: ${permission.parentId}`);
    return `/${segments.join('/')}`;
  }

  return buildCompleteRoute(parent, flattenedPermissions, segments);
}

// Components
export function NewFeatureTag() {
  return (
    <Tag color="cyan" className="!ml-2">
      <div className="flex items-center gap-1">
        <Iconify icon="solar:bell-bing-bold-duotone" size={12} />
        <span className="ms-1">NEW</span>
      </div>
    </Tag>
  );
}

// Route Transformers
const createBaseRoute = (
  permission: MenuEntity,
  completeRoute: string,
): AppRouteObject => {
  const { route, label, icon, order } = permission;

  const baseRoute: AppRouteObject = {
    path: route,
    meta: {
      label,
      key: completeRoute,
      // hideMenu: !!hide,
      // hideTab,
      // disabled: status === BasicStatus.DISABLE,
    },
  };

  if (order) baseRoute.order = order;
  if (baseRoute.meta) {
    if (icon) baseRoute.meta.icon = icon;
    // if (frameSrc) baseRoute.meta.frameSrc = frameSrc;
    // if (newFeature) baseRoute.meta.suffix = <NewFeatureTag />;
  }

  return baseRoute;
};

const createCatalogueRoute = (
  permission: MenuEntity,
  flattenedPermissions: MenuEntity[],
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions),
  );

  if (baseRoute.meta) {
    baseRoute.meta.hideTab = true;
  }

  const { parentId, children = [] } = permission;
  if (!parentId) {
    baseRoute.element = (
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    );
  }

  baseRoute.children = transformPermissionsToRoutes(
    children,
    flattenedPermissions,
  );

  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index: true,
      element: <Navigate to={children[0].route} replace />,
    });
  }

  return baseRoute;
};

const createMenuRoute = (
  permission: MenuEntity,
  flattenedPermissions: MenuEntity[],
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions),
  );

  if (permission.component) {
    const Element = lazy(loadComponentFromPath(permission.component) as any);

    // if (permission.frameSrc) {
    // 	baseRoute.element = <Element src={permission.frameSrc} />;
    // } else {
    baseRoute.element = (
      <Suspense fallback={<CircleLoading />}>
        <Element />
      </Suspense>
    );
    // }
  }

  return baseRoute;
};

function transformPermissionsToRoutes(
  permissions: MenuEntity[],
  flattenedPermissions: MenuEntity[],
): AppRouteObject[] {
  return permissions.map((permission) => {
    if (permission.type === PermissionType.CATALOGUE) {
      return createCatalogueRoute(permission, flattenedPermissions);
    }
    return createMenuRoute(permission, flattenedPermissions);
  });
}

const ROUTE_MODE = import.meta.env.VITE_APP_ROUTER_MODE;
export function usePermissionRoutes() {
  if (ROUTE_MODE === 'module') {
    return getRoutesFromModules();
  }

  const permissions = useUserPermission();

  return useMemo(() => {
    if (!permissions) return [];

    const flattenedPermissions = flattenTrees(permissions, (a, b) => {
      return a.order - b.order;
    });

    return transformPermissionsToRoutes(permissions, flattenedPermissions);
  }, [permissions]);
}
