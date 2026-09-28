# Registry Preview themes

Each Registry item Preview on a Collection page owns one concrete `light` or `dark` theme. It starts
with the app's resolved appearance. Changing either the app preference or its resolved appearance
clears every local Preview choice and returns each Preview to the app. Each Preview's switch changes
only that Preview. Theme changes preserve both the iframe and the Registry item's state.

Collection pages render each Registry item through its canonical Preview route in a same-origin
iframe with no theme query. Before hydration, an embedded Preview initializes from the parent
document's `dark` class. After hydration, the parent sends an explicit `light` or `dark` message
whenever the effective Preview theme changes. The Preview validates the message source and origin,
then applies `data-theme`, the `dark` class, and `color-scheme` to its document root. The iframe
remains hidden until its load event fires.

Reset uses the same validated message channel to remount only the generated Registry item inside its
existing document. Opening a Preview in a new tab always includes its current explicit
`?theme=light|dark`. The Preview head script applies that query before paint. A standalone Preview
with a missing or invalid value uses light as a deterministic fallback; an embedded Preview without
a query initializes from its parent document. Preview documents do not read theme storage or listen
to the OS color scheme. Registry items respond only to document CSS, whose root-level theme
authority covers body-mounted portals, native controls, and ordinary descendants.
