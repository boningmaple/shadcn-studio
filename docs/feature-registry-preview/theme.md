# Registry Preview themes

Each Registry item Preview on a Collection page follows the app's resolved light or dark theme
until the visitor uses that Preview's theme switch. The first switch adds an explicit
`?theme=light|dark` override to the iframe and new-tab URL. Clicking the app theme switch removes
that override, returning every Preview to the app theme. Changing either URL reloads the affected
iframe, while resetting an item recreates its iframe without changing its current URL theme.

Collection pages render each Registry item through its canonical Preview route in a same-origin
iframe. A queryless Preview uses the app's existing stored-theme state, `storage` events, and system
color-scheme listener. A valid query instead controls that Preview document's `<html>` element and
does not listen for app or system theme changes. This document-root authority covers body-mounted
portals, native controls, and ordinary descendants without cross-frame messaging or observation.

The app and Preview routes have separate runtime theme boundaries. Registry items do not receive
the app's theme context and should respond to document CSS. A Preview-specific head script applies
a valid query before paint without changing local storage. Missing or invalid values fall back to
the saved app theme, including its resolved system appearance.
