export type RouteSearchMetadata = {
  description: string;
  href: string;
  name: string;
  title: string;
};

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    search?: RouteSearchMetadata;
  }
}
