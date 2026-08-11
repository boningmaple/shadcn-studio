/**
 * The one source of truth for what exists in VibeUI and what it is called.
 *
 * Metadata only: this module is imported by the server, and a `component:`
 * field would drag all 188 Demo components into the server bundle. Route
 * modules keep their own imports and pass them in alongside the slug (ADR-0003).
 */

/** One self-contained illustration of a Component's usage, shown as one card. */
export type Demo = {
  /** Unique within its Component, and the suffix of the Demo's anchor id. */
  id: string;
  name: string;
  /** Spans the full grid width rather than one column. */
  wide?: boolean;
};

/** One catalog entry, with its own page. */
export type ComponentEntry = {
  /** Prefix of every Demo source filename and generated code artifact. */
  codeArtifactPrefix: string;
  /** How a single Demo of this Component is named in prose. */
  demoNoun: string;
  demos: readonly Demo[];
  description: string;
  href: string;
  name: string;
  sectionId: string;
  sectionTitle: string;
  slug: string;
};

export const components = [
  {
    codeArtifactPrefix: "md-app-bar",
    demoNoun: "app bar",
    demos: [
      { id: "01", name: "Small app bar", wide: true },
      { id: "02", name: "Centered app bar", wide: true },
      { id: "03", name: "Medium app bar", wide: true },
      { id: "04", name: "Search app bar", wide: true },
    ],
    description:
      "Explore Material app bars for navigation, titles, actions, filters, and search.",
    href: "/material-design/components/app-bar",
    name: "App Bar",
    sectionId: "app-bar-patterns-title",
    sectionTitle: "App Bar Patterns",
    slug: "app-bar",
  },
  {
    codeArtifactPrefix: "md-avatar",
    demoNoun: "avatar",
    demos: [
      { id: "01", name: "Images and fallbacks" },
      { id: "02", name: "Avatar sizes" },
      { id: "03", name: "Presence statuses" },
      { id: "04", name: "Badges with outline rings", wide: true },
      { id: "05", name: "Outlined avatars" },
      { id: "06", name: "Avatar buttons" },
      { id: "07", name: "Avatar group" },
      { id: "08", name: "Leading avatar on top" },
      { id: "09", name: "Group with count" },
      { id: "10", name: "Social proof" },
    ],
    description:
      "Explore composable avatars with image fallbacks, sizes, badges, groups, and interactive states, built with React and Tailwind CSS.",
    href: "/material-design/components/avatar",
    name: "Avatar",
    sectionId: "avatar-patterns-title",
    sectionTitle: "Avatar Patterns",
    slug: "avatar",
  },
  {
    codeArtifactPrefix: "md-badge",
    demoNoun: "badge",
    demos: [
      { id: "01", name: "Material 3 badge variants", wide: true },
      { id: "02", name: "Badges on icon controls", wide: true },
      { id: "03", name: "Clear badge on selection", wide: true },
      { id: "04", name: "Badges in tabs", wide: true },
      { id: "05", name: "Right-to-left placement", wide: true },
    ],
    description:
      "Explore Material 3 notification dots and count badges, built with React and Tailwind CSS.",
    href: "/material-design/components/badge",
    name: "Badge",
    sectionId: "badge-patterns-title",
    sectionTitle: "Badge Patterns",
    slug: "badge",
  },
  {
    codeArtifactPrefix: "md-bottom-sheet",
    demoNoun: "bottom sheet",
    demos: [
      { id: "01", name: "Modal bottom sheet" },
      { id: "02", name: "Standard bottom sheet" },
      { id: "03", name: "Snapping bottom sheet" },
      { id: "04", name: "Settings bottom sheet" },
    ],
    description:
      "Explore modal, standard, snapping, and settings bottom sheets for supplementary workflows.",
    href: "/material-design/components/bottom-sheet",
    name: "Bottom Sheet",
    sectionId: "bottom-sheet-patterns-title",
    sectionTitle: "Bottom Sheet Patterns",
    slug: "bottom-sheet",
  },
  {
    codeArtifactPrefix: "md-button-group",
    demoNoun: "button group",
    demos: [
      { id: "01", name: "Related action buttons", wide: true },
      { id: "02", name: "Icon button group", wide: true },
      { id: "03", name: "Single-select toggle group", wide: true },
      { id: "04", name: "Multi-select icon toggle group", wide: true },
    ],
    description:
      "Explore Material 3 action and toggle button groups with React Aria toolbar and toggle selection behavior.",
    href: "/material-design/components/button-group",
    name: "Button Group",
    sectionId: "button-group-patterns-title",
    sectionTitle: "Button Group Patterns",
    slug: "button-group",
  },
  {
    codeArtifactPrefix: "md-button",
    demoNoun: "button",
    demos: [
      { id: "01", name: "Material 3 variants", wide: true },
      { id: "02", name: "Material 3 variants with icon", wide: true },
      { id: "03", name: "Elevated button states", wide: true },
      { id: "04", name: "Filled button states", wide: true },
      { id: "05", name: "Tonal button states", wide: true },
      { id: "06", name: "Outlined button states", wide: true },
      { id: "07", name: "Text button states", wide: true },
      { id: "08", name: "Material 3 shapes", wide: true },
      { id: "09", name: "Material 3 sizes", wide: true },
      { id: "10", name: "Material 3 sizes with icon", wide: true },
    ],
    description:
      "Explore a collection of buttons, built with Material Design, React Aria UI, React, and Tailwind CSS.",
    href: "/material-design/components/button",
    name: "Button",
    sectionId: "button-variants-title",
    sectionTitle: "Button Variants",
    slug: "button",
  },
  {
    codeArtifactPrefix: "md-card",
    demoNoun: "card",
    demos: [
      { id: "01", name: "Material 3 card variants", wide: true },
      { id: "02", name: "Card with media and actions", wide: true },
      { id: "03", name: "Interactive outlined cards", wide: true },
      { id: "04", name: "Elevated checklist card", wide: true },
    ],
    description:
      "Explore Material 3 elevated, filled, and outlined card containers with reusable content and action slots.",
    href: "/material-design/components/card",
    name: "Card",
    sectionId: "card-patterns-title",
    sectionTitle: "Card Patterns",
    slug: "card",
  },
  {
    codeArtifactPrefix: "md-carousel",
    demoNoun: "carousel",
    demos: [
      { id: "01", name: "Browse carousel with cards", wide: true },
      { id: "02", name: "Hero carousel", wide: true },
      { id: "03", name: "Compact carousel", wide: true },
      { id: "04", name: "Vertical supporting carousel", wide: true },
    ],
    description:
      "Explore Material 3 carousel layouts for horizontal browsing, hero panels, compact cards, and vertical update stacks.",
    href: "/material-design/components/carousel",
    name: "Carousel",
    sectionId: "carousel-patterns-title",
    sectionTitle: "Carousel Patterns",
    slug: "carousel",
  },
  {
    codeArtifactPrefix: "md-checkbox",
    demoNoun: "checkbox",
    demos: [
      { id: "01", name: "Checkbox states", wide: true },
      { id: "02", name: "Checkbox group", wide: true },
      { id: "03", name: "Indeterminate parent checkbox", wide: true },
      { id: "04", name: "Required checkbox group", wide: true },
      { id: "05", name: "Disabled and read-only checkboxes", wide: true },
    ],
    description:
      "Explore Material 3 checkboxes and checkbox groups for selecting multiple options.",
    href: "/material-design/components/checkbox",
    name: "Checkbox",
    sectionId: "checkbox-patterns-title",
    sectionTitle: "Checkbox Patterns",
    slug: "checkbox",
  },
  {
    codeArtifactPrefix: "md-chips",
    demoNoun: "chips example",
    demos: [
      { id: "01", name: "Assist chips", wide: true },
      { id: "02", name: "Filter chips", wide: true },
      { id: "03", name: "Suggestion chips", wide: true },
      { id: "04", name: "Outlined assist chip states", wide: true },
      { id: "05", name: "Elevated assist chip states", wide: true },
      { id: "06", name: "Outlined filter chip states", wide: true },
      { id: "07", name: "Elevated filter chip states", wide: true },
      { id: "08", name: "Outlined suggestion chip states", wide: true },
      { id: "09", name: "Elevated suggestion chip states", wide: true },
    ],
    description:
      "Explore accessible Material Design 3 assist, filter, and suggestion chips built with React Aria TagGroup, React, and Tailwind CSS.",
    href: "/material-design/components/chips",
    name: "Chips",
    sectionId: "chips-variants-title",
    sectionTitle: "Chips Variants",
    slug: "chips",
  },
  {
    codeArtifactPrefix: "md-date-picker",
    demoNoun: "date picker",
    demos: [
      { id: "01", name: "Docked date picker" },
      { id: "02", name: "Date range picker", wide: true },
      { id: "03", name: "Modal date picker" },
      { id: "04", name: "Modal date input" },
    ],
    description:
      "Explore Material 3 docked, range, modal calendar, and modal input date picker patterns.",
    href: "/material-design/components/date-picker",
    name: "Date Picker",
    sectionId: "date-picker-patterns-title",
    sectionTitle: "Date Picker Patterns",
    slug: "date-picker",
  },
  {
    codeArtifactPrefix: "md-dialog",
    demoNoun: "dialog",
    demos: [
      { id: "01", name: "Basic dialog" },
      { id: "02", name: "Alert dialog" },
      { id: "03", name: "Dialog with text field" },
      { id: "04", name: "Full-screen dialog", wide: true },
    ],
    description:
      "Explore Material 3 standard, alert, form, and full-screen dialogs for focused workflows.",
    href: "/material-design/components/dialog",
    name: "Dialog",
    sectionId: "dialog-patterns-title",
    sectionTitle: "Dialog Patterns",
    slug: "dialog",
  },
  {
    codeArtifactPrefix: "md-divider",
    demoNoun: "divider",
    demos: [
      { id: "01", name: "Full-width dividers", wide: true },
      { id: "02", name: "Inset list dividers", wide: true },
      { id: "03", name: "Vertical dividers", wide: true },
      { id: "04", name: "Responsive dividers", wide: true },
    ],
    description:
      "Explore Material 3 dividers for separating content in lists, layouts, and dense surfaces.",
    href: "/material-design/components/divider",
    name: "Divider",
    sectionId: "divider-patterns-title",
    sectionTitle: "Divider Patterns",
    slug: "divider",
  },
  {
    codeArtifactPrefix: "md-extended-fab",
    demoNoun: "extended FAB",
    demos: [
      { id: "01", name: "Extended FAB color variants", wide: true },
      { id: "02", name: "Extended FAB with and without icons", wide: true },
      { id: "03", name: "Default and lowered elevation", wide: true },
      { id: "04", name: "Extended FAB states", wide: true },
    ],
    description:
      "Explore Material 3 extended floating action buttons for high-emphasis primary actions with labels, icons, colors, and lowered elevation.",
    href: "/material-design/components/extended-fab",
    name: "Extended FAB",
    sectionId: "extended-fab-patterns-title",
    sectionTitle: "Extended FAB Patterns",
    slug: "extended-fab",
  },
  {
    codeArtifactPrefix: "md-fab-menu",
    demoNoun: "FAB menu",
    demos: [
      { id: "01", name: "Create FAB menu", wide: true },
      { id: "02", name: "Capture FAB menu", wide: true },
      { id: "03", name: "FAB menu with disabled item", wide: true },
      { id: "04", name: "FAB menu with custom trigger", wide: true },
    ],
    description:
      "Explore Material 3 floating action button menus for two to six related high-emphasis actions.",
    href: "/material-design/components/fab-menu",
    name: "FAB Menu",
    sectionId: "fab-menu-patterns-title",
    sectionTitle: "FAB Menu Patterns",
    slug: "fab-menu",
  },
  {
    codeArtifactPrefix: "md-fab",
    demoNoun: "FAB",
    demos: [
      { id: "01", name: "FAB sizes", wide: true },
      { id: "02", name: "FAB color variants", wide: true },
      { id: "03", name: "Default and lowered FABs", wide: true },
      { id: "04", name: "FAB states", wide: true },
    ],
    description:
      "Explore Material 3 floating action buttons for high-emphasis icon actions with responsive sizes, colors, and elevation.",
    href: "/material-design/components/fab",
    name: "FAB",
    sectionId: "fab-patterns-title",
    sectionTitle: "FAB Patterns",
    slug: "fab",
  },
  {
    codeArtifactPrefix: "md-icon-button",
    demoNoun: "icon button",
    demos: [
      { id: "01", name: "Default color styles", wide: true },
      { id: "02", name: "Toggle color styles", wide: true },
      { id: "03", name: "Default states", wide: true },
      { id: "04", name: "Toggle states", wide: true },
      { id: "05", name: "Round and square shapes" },
      { id: "06", name: "Five sizes", wide: true },
      { id: "07", name: "Narrow, default, and wide widths" },
      { id: "08", name: "Web tooltips" },
    ],
    description:
      "Explore Material 3 icon button colors, toggle states, shapes, sizes, widths, and tooltips, built with React Aria UI, React, and Tailwind CSS.",
    href: "/material-design/components/icon-button",
    name: "Icon Button",
    sectionId: "icon-button-examples-title",
    sectionTitle: "Icon Button Examples",
    slug: "icon-button",
  },
  {
    codeArtifactPrefix: "md-list",
    demoNoun: "list",
    demos: [
      { id: "01", name: "Text and metadata list" },
      { id: "02", name: "Leading and trailing content" },
      { id: "03", name: "Multi-select list" },
      { id: "04", name: "Sectioned control list" },
    ],
    description:
      "Explore Material 3 list items with leading content, supporting text, trailing actions, selection controls, and sections.",
    href: "/material-design/components/list",
    name: "List",
    sectionId: "list-patterns-title",
    sectionTitle: "List Patterns",
    slug: "list",
  },
  {
    codeArtifactPrefix: "md-loading-indicator",
    demoNoun: "loading indicator",
    demos: [
      { id: "01", name: "Loading indicator sizes", wide: true },
      { id: "02", name: "Loading indicators with labels", wide: true },
      { id: "03", name: "Loading state in buttons", wide: true },
      { id: "04", name: "Loading state in a container", wide: true },
      { id: "05", name: "Full-area loading state", wide: true },
    ],
    description:
      "Explore Material 3 loading indicators for communicating an ongoing operation with plain, tonal, surface, and inverse treatments.",
    href: "/material-design/components/loading-indicator",
    name: "Loading Indicator",
    sectionId: "loading-indicator-patterns-title",
    sectionTitle: "Loading Indicator Patterns",
    slug: "loading-indicator",
  },
  {
    codeArtifactPrefix: "md-menu",
    demoNoun: "menu",
    demos: [
      { id: "01", name: "Simple menu" },
      { id: "02", name: "Sectioned menu", wide: true },
      { id: "03", name: "Selectable menu" },
      { id: "04", name: "Submenu" },
    ],
    description:
      "Explore Material 3 menus with temporary surfaces, sections, shortcuts, selectable items, and submenus.",
    href: "/material-design/components/menu",
    name: "Menu",
    sectionId: "menu-patterns-title",
    sectionTitle: "Menu Patterns",
    slug: "menu",
  },
  {
    codeArtifactPrefix: "md-navigation-bar",
    demoNoun: "navigation bar",
    demos: [
      { id: "01", name: "Three destinations", wide: true },
      { id: "02", name: "Badged destinations", wide: true },
      { id: "03", name: "Five destinations", wide: true },
      { id: "04", name: "Navigation bar in layout", wide: true },
    ],
    description:
      "Explore Material 3 navigation bars with active indicators, labels, and destination badges.",
    href: "/material-design/components/navigation-bar",
    name: "Navigation Bar",
    sectionId: "navigation-bar-patterns-title",
    sectionTitle: "Navigation Bar Patterns",
    slug: "navigation-bar",
  },
  {
    codeArtifactPrefix: "md-navigation-drawer",
    demoNoun: "navigation drawer",
    demos: [
      { id: "01", name: "Standard navigation drawer", wide: true },
      { id: "02", name: "Modal navigation drawer" },
      { id: "03", name: "Grouped navigation drawer" },
      { id: "04", name: "Account navigation drawer" },
    ],
    description:
      "Explore Material navigation drawers with standard, modal, grouped, and account-header layouts.",
    href: "/material-design/components/navigation-drawer",
    name: "Navigation Drawer",
    sectionId: "navigation-drawer-patterns-title",
    sectionTitle: "Navigation Drawer Patterns",
    slug: "navigation-drawer",
  },
  {
    codeArtifactPrefix: "md-navigation-rail",
    demoNoun: "navigation rail",
    demos: [
      { id: "01", name: "Rail with FAB" },
      { id: "02", name: "Centered rail with badges" },
      { id: "03", name: "Persistent labels" },
      { id: "04", name: "Rail in layout", wide: true },
    ],
    description:
      "Explore Material navigation rails with optional FABs, badges, label modes, and adaptive layouts.",
    href: "/material-design/components/navigation-rail",
    name: "Navigation Rail",
    sectionId: "navigation-rail-patterns-title",
    sectionTitle: "Navigation Rail Patterns",
    slug: "navigation-rail",
  },
  {
    codeArtifactPrefix: "md-progress-indicator",
    demoNoun: "progress indicator",
    demos: [
      { id: "01", name: "Linear progress states", wide: true },
      { id: "02", name: "Animated linear progress", wide: true },
      { id: "03", name: "Determinate progress", wide: true },
      { id: "04", name: "Indeterminate progress", wide: true },
      { id: "05", name: "Circular progress values", wide: true },
    ],
    description:
      "Explore Material 3 linear and circular progress indicators for determinate and indeterminate operations.",
    href: "/material-design/components/progress-indicator",
    name: "Progress Indicator",
    sectionId: "progress-indicator-patterns-title",
    sectionTitle: "Progress Indicator Patterns",
    slug: "progress-indicator",
  },
  {
    codeArtifactPrefix: "md-radio-button",
    demoNoun: "radio button",
    demos: [
      { id: "01", name: "Radio button states", wide: true },
      { id: "02", name: "Radio group", wide: true },
      { id: "03", name: "Required radio group", wide: true },
      { id: "04", name: "Disabled and read-only radio groups", wide: true },
      { id: "05", name: "Controlled radio group", wide: true },
    ],
    description:
      "Explore Material 3 radio buttons and radio groups for selecting a single option from a set.",
    href: "/material-design/components/radio-button",
    name: "Radio Button",
    sectionId: "radio-button-patterns-title",
    sectionTitle: "Radio Button Patterns",
    slug: "radio-button",
  },
  {
    codeArtifactPrefix: "md-search",
    demoNoun: "search",
    demos: [
      { id: "01", name: "Search bar states" },
      { id: "02", name: "Search bar actions" },
      { id: "03", name: "Docked search view" },
      { id: "04", name: "Full-screen search view" },
    ],
    description:
      "Explore Material 3 search bars, trailing actions, docked search views, and full-screen search views.",
    href: "/material-design/components/search",
    name: "Search",
    sectionId: "search-patterns-title",
    sectionTitle: "Search Patterns",
    slug: "search",
  },
  {
    codeArtifactPrefix: "md-segmented-button",
    demoNoun: "segmented button",
    demos: [
      { id: "01", name: "Single-select text segments", wide: true },
      { id: "02", name: "Segments with icons", wide: true },
      { id: "03", name: "Multi-select icon segments", wide: true },
      { id: "04", name: "Compact and vertical segmented buttons", wide: true },
    ],
    description:
      "Explore Material 3 segmented buttons for switching views, sorting content, and choosing single or multiple related options.",
    href: "/material-design/components/segmented-button",
    name: "Segmented Button",
    sectionId: "segmented-button-patterns-title",
    sectionTitle: "Segmented Button Patterns",
    slug: "segmented-button",
  },
  {
    codeArtifactPrefix: "md-side-sheet",
    demoNoun: "side sheet",
    demos: [
      { id: "01", name: "Standard side sheet", wide: true },
      { id: "02", name: "Modal side sheet" },
      { id: "03", name: "Left side sheet" },
      { id: "04", name: "Side sheet with actions" },
    ],
    description:
      "Explore standard and modal side sheets for supplemental details, navigation, and focused actions.",
    href: "/material-design/components/side-sheet",
    name: "Side Sheet",
    sectionId: "side-sheet-patterns-title",
    sectionTitle: "Side Sheet Patterns",
    slug: "side-sheet",
  },
  {
    codeArtifactPrefix: "md-slider",
    demoNoun: "slider",
    demos: [
      { id: "01", name: "Slider states", wide: true },
      { id: "02", name: "Step sliders", wide: true },
      { id: "03", name: "Range slider", wide: true },
      { id: "04", name: "Slider value formatting", wide: true },
      { id: "05", name: "Vertical sliders", wide: true },
    ],
    description:
      "Explore Material 3 sliders and range sliders for selecting a value from a continuous or stepped range.",
    href: "/material-design/components/slider",
    name: "Slider",
    sectionId: "slider-patterns-title",
    sectionTitle: "Slider Patterns",
    slug: "slider",
  },
  {
    codeArtifactPrefix: "md-snackbar",
    demoNoun: "snackbar",
    demos: [
      { id: "01", name: "Basic snackbar" },
      { id: "02", name: "Snackbar with action" },
      { id: "03", name: "Dismissible snackbar" },
      { id: "04", name: "Consecutive snackbars" },
    ],
    description:
      "Explore Material 3 snackbars for temporary process feedback, optional actions, and dismissible notices.",
    href: "/material-design/components/snackbar",
    name: "Snackbar",
    sectionId: "snackbar-patterns-title",
    sectionTitle: "Snackbar Patterns",
    slug: "snackbar",
  },
  {
    codeArtifactPrefix: "md-split-button",
    demoNoun: "split button",
    demos: [
      { id: "01", name: "Filled split button", wide: true },
      { id: "02", name: "Tonal and outlined split buttons", wide: true },
      { id: "03", name: "Split button sizes", wide: true },
      { id: "04", name: "Split button disabled states", wide: true },
    ],
    description:
      "Explore Material 3 split buttons that pair a primary action with a menu of related alternatives.",
    href: "/material-design/components/split-button",
    name: "Split Button",
    sectionId: "split-button-patterns-title",
    sectionTitle: "Split Button Patterns",
    slug: "split-button",
  },
  {
    codeArtifactPrefix: "md-switch",
    demoNoun: "switch",
    demos: [
      { id: "01", name: "Switch states", wide: true },
      { id: "02", name: "Switch list", wide: true },
      { id: "03", name: "Controlled switch", wide: true },
      { id: "04", name: "Disabled and read-only switches", wide: true },
      { id: "05", name: "Switches with icons and descriptions", wide: true },
    ],
    description:
      "Explore Material 3 switches for toggling a single setting on or off.",
    href: "/material-design/components/switch",
    name: "Switch",
    sectionId: "switch-patterns-title",
    sectionTitle: "Switch Patterns",
    slug: "switch",
  },
  {
    codeArtifactPrefix: "md-tabs",
    demoNoun: "tabs",
    demos: [
      { id: "01", name: "Primary tabs", wide: true },
      { id: "02", name: "Secondary tabs", wide: true },
      { id: "03", name: "Primary active tab states", wide: true },
      { id: "04", name: "Primary inactive tab states", wide: true },
      { id: "05", name: "Secondary active tab states", wide: true },
      { id: "06", name: "Secondary inactive tab states", wide: true },
      { id: "07", name: "Primary tabs with icons", wide: true },
      { id: "08", name: "Tabs with disabled item", wide: true },
      { id: "09", name: "Vertical tabs", wide: true },
    ],
    description:
      "Explore Material 3 primary and secondary tabs, built with React Aria UI, React, and Tailwind CSS.",
    href: "/material-design/components/tabs",
    name: "Tabs",
    sectionId: "tabs-variants-title",
    sectionTitle: "Tab Variants and States",
    slug: "tabs",
  },
  {
    codeArtifactPrefix: "md-text-field",
    demoNoun: "text field",
    demos: [
      { id: "01", name: "Filled text fields", wide: true },
      { id: "02", name: "Outlined text fields", wide: true },
      { id: "03", name: "Text fields with icons", wide: true },
      { id: "04", name: "Text areas", wide: true },
      { id: "05", name: "Text field form", wide: true },
    ],
    description:
      "Explore Material 3 text fields and text areas for collecting user input.",
    href: "/material-design/components/text-field",
    name: "Text Field",
    sectionId: "text-field-patterns-title",
    sectionTitle: "Text Field Patterns",
    slug: "text-field",
  },
  {
    codeArtifactPrefix: "md-time-picker",
    demoNoun: "time picker",
    demos: [
      { id: "01", name: "Input time picker" },
      { id: "02", name: "24-hour time with seconds" },
      { id: "03", name: "Disabled and invalid states" },
      { id: "04", name: "Modal time input" },
    ],
    description:
      "Explore Material 3 input time pickers with segmented keyboard editing, validation states, and a modal input flow.",
    href: "/material-design/components/time-picker",
    name: "Time Picker",
    sectionId: "time-picker-patterns-title",
    sectionTitle: "Time Picker Patterns",
    slug: "time-picker",
  },
  {
    codeArtifactPrefix: "md-toggle-button",
    demoNoun: "toggle button",
    demos: [
      { id: "01", name: "Material 3 variants", wide: true },
      { id: "02", name: "Material 3 variants with icon", wide: true },
      { id: "03", name: "Elevated toggle button states", wide: true },
      { id: "04", name: "Filled toggle button states", wide: true },
      { id: "05", name: "Tonal toggle button states", wide: true },
      { id: "06", name: "Outlined toggle button states", wide: true },
    ],
    description:
      "Explore Material 3 toggle button selection states, built with React Aria UI, React, and Tailwind CSS.",
    href: "/material-design/components/toggle-button",
    name: "Toggle Button",
    sectionId: "toggle-button-states-title",
    sectionTitle: "Toggle Button States",
    slug: "toggle-button",
  },
  {
    codeArtifactPrefix: "md-toolbar",
    demoNoun: "toolbar",
    demos: [
      { id: "01", name: "Document toolbar", wide: true },
      { id: "02", name: "Formatting toolbar" },
      { id: "03", name: "Bottom toolbar", wide: true },
      { id: "04", name: "Contextual toolbars", wide: true },
    ],
    description:
      "Explore Material toolbar patterns for document actions, formatting, bottom actions, and contextual editing.",
    href: "/material-design/components/toolbar",
    name: "Toolbar",
    sectionId: "toolbar-patterns-title",
    sectionTitle: "Toolbar Patterns",
    slug: "toolbar",
  },
  {
    codeArtifactPrefix: "md-tooltip",
    demoNoun: "tooltip",
    demos: [
      { id: "01", name: "Plain icon tooltips" },
      { id: "02", name: "Tooltip placements" },
      { id: "03", name: "Rich tooltip with action" },
      { id: "04", name: "Mixed tooltip controls", wide: true },
    ],
    description:
      "Explore Material 3 plain labels and rich contextual tooltips for icon-only controls, actions, and help affordances.",
    href: "/material-design/components/tooltip",
    name: "Tooltip",
    sectionId: "tooltip-patterns-title",
    sectionTitle: "Tooltip Patterns",
    slug: "tooltip",
  },
] as const satisfies readonly ComponentEntry[];

export type ComponentSlug = (typeof components)[number]["slug"];

/** The registry entry for one slug, with its Demo ids still literal. */
export type ComponentEntryFor<TSlug extends ComponentSlug> = Extract<
  (typeof components)[number],
  { slug: TSlug }
>;

/** The Demo ids declared for one Component, as a union of literals. */
export type DemoIdOf<TSlug extends ComponentSlug> =
  ComponentEntryFor<TSlug>["demos"][number]["id"];

const bySlug = new Map<string, ComponentEntry>(
  components.map((component) => [component.slug, component]),
);

export function getComponent<TSlug extends ComponentSlug>(
  slug: TSlug,
): ComponentEntryFor<TSlug> {
  const component = bySlug.get(slug);

  if (component === undefined) {
    throw new Error(`No Component registered for slug ${slug}`);
  }

  // The map is built from `components`, so the entry for a known slug is that
  // slug's entry; the lookup itself cannot carry that through.
  return component as ComponentEntryFor<TSlug>;
}

/**
 * The id a Demo carries everywhere it appears: its source filename, its
 * generated code artifact, its card's DOM id, and its Search record.
 */
export function demoAnchorId(component: ComponentEntry, demo: Demo): string {
  return `${component.codeArtifactPrefix}-${demo.id}`;
}
