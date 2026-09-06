# Registry Preview themes

Each Registry item Preview on a Collection page follows the app's resolved light or dark theme
until the visitor uses that Preview's theme switch. The first switch gives that Preview an
independent, component-local theme; later app theme changes do not resynchronize it. Resetting a
Registry item preserves whether its Preview follows the app or owns a selected theme.

The Preview boundary explicitly applies the `.light` or `.dark` theme scope, `data-theme`,
`color-scheme`, `background-color`, and `color`. This prevents rendered items from inheriting
already-computed shell colors. Opening a Preview in a new tab carries its theme in the optional
`?theme=light|dark` parameter. The parameter never changes the app theme preference; missing or
invalid values fall back to the resolved app theme.

## Known limitation: portals

The theme boundary covers descendants rendered inside the Preview container. Overlays that portal
to `document.body`—including dialogs, popovers, menus, and tooltips—are outside that boundary and
can still inherit the app shell theme. Supporting those components requires a scoped portal host or
iframe architecture and is intentionally deferred. Tests should cover the supported in-boundary
contract without treating the current portal behavior as correct.
