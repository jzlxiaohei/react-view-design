import React from 'react';
import qs from 'query-string';
import isArray from 'lodash/isArray';
import matchURI from './matchURI';
import createLink from './createLink';

type RouteConfig = {
  path: string,
  fetchComponent?: () => Promise<React.Component>,
  component?: React.Component,
  onEnter?:() => void,
  onLeave?:() => void,
  container?: React.Component | Array<React.Component>
}

type Location = { pathname:string, search: string };

function getRenderMeta(component, props, route: RouteConfig) {
  return {
    component,
    props,
    container: route.container,
    $originRouteConfig: route,
  };
}

class SimpleRouter {
  history = null;
  Link = null;
  routes: Array<RouteConfig> = null;
  $currentRoute = null;

  setRoutes(routes) {
    this.routes = routes;
    return this;
  }

  setHistory(history) {
    this.history = history;
    this.Link = createLink(this.history);
    return this;
  }

  // replace = (location: Location) => {
  //   if (!(location && location.pathname)) {
  //     throw new Error('pathname should be provided');
  //   }
  //   this.history.replace(location);
  // }

  // navTo = (location: Location) => {
  //   if (!(location && location.pathname)) {
  //     throw new Error('pathname should be provided');
  //   }
  //   this.history.push(location);
  // }

  run(mountFn, errorFn, { ignoreCurrent = false } = {}) {
    this.unListen = this.history.listen((location) => {
      this._runByLocation(location, mountFn, errorFn);
    });
    if (!ignoreCurrent) {
      this._runByLocation(this.history.location, mountFn, errorFn);
    }
  }

  destroy() {
    if (this.unListen) {
      this.unListen();
    }
  }

  _innerRender(location) {
    if (this.$currentRoute && this.$currentRoute.onLeave) {
      this.$currentRoute.onLeave(this.$currentRoute);
    }
    return this._getComponentByLocation(location)
      .then((routeInfo) => {
        this.$currentRoute = routeInfo.$originRouteConfig;

        if (isArray(routeInfo.container)) {
          return this._buildNestedElement([...routeInfo.container, routeInfo.component], 0, routeInfo.props);
        }
        const routeComponent = React.createElement(routeInfo.component, routeInfo.props);
        if (routeInfo.container) {
          return React.createElement(routeInfo.container, routeInfo.props, routeComponent);
        }
        return routeComponent;
      })
      .catch((err) => {
        this.$currentRoute = null;
        throw err;
      });
  }

  _runByLocation(location, mountFn, errorFn) {
    return this._innerRender(location)
        .then(component => mountFn(component))
        .catch(err => errorFn && errorFn(err));
  }

  _getProps(params, location: Location, route) {
    location.query = qs.parse(location.search); // eslint-disable-line no-param-reassign
    return {
      params,
      location,
      history: this.history,
      routeConfig: route,
      routes: this.routes,
    };
  }

  _buildNestedElement = function buildElement(elements, index, props) {
    if (index === elements.length - 1) return React.createElement(elements[index], props);
    return React.createElement(elements[index], props, buildElement(elements, index + 1, props));
  }

  _parseRouter(pathname): null | { route: RouteConfig, params: Object } {
    const routes = this.routes;
    for (let i = 0; i < routes.length; i += 1) {
      const route = routes[i];
      const params = matchURI(route, pathname);
      if (params) {
        return {
          route,
          params,
        };
      }
    }
    return null;
  }

  _getComponentByLocation(location :Location): Promise<any> {
    const pathname = location.pathname;
    const routeInfo = this._parseRouter(location.pathname);

    if (routeInfo) {
      const { route, params } = routeInfo;
      if (route.onEnter) {
        route.onEnter(route, this.replace);
      }
      // replace happened in onEnter callback. use new pathname
      if (this.history.location.pathname !== pathname) {
        return this._getComponentByLocation({
          ...location,
          pathname: this.history.location.pathname,
        });
      }

      const props = this._getProps(params, location, route);

      if (route.fetchComponent) {
        return route.fetchComponent()
            .then(component => getRenderMeta(component, props, route));
      }
      return Promise.resolve(getRenderMeta(route.component, props, route));
    }

    return Promise.reject(404);
  }
}

export default SimpleRouter;
