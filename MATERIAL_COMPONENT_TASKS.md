# Material Component Tasks

This is the execution queue for the Material component gallery. Always choose
the first unchecked task whose listed dependencies are complete.

## Implementation Rules

- Follow the target component's [Material Design 3 guidelines](https://m3.material.io/components)
  for anatomy, variants, layout, color roles, states, and motion.
- Use the mapping below to choose the base implementation. Prefer the installed
  [React Aria Components](https://react-aria.adobe.com/) for semantics,
  accessibility, focus, keyboard, and interaction behavior. Use the existing
  local [shadcn components](https://ui.shadcn.com/docs/components) where mapped.
- React Aria and all shadcn components are already installed. Do not install
  packages or download components unless the task cannot be completed with the
  repository's current dependencies.
- When guidance overlaps, Material controls visual design, React Aria controls
  accessible behavior, and existing project patterns control APIs, naming, and
  file structure. Reuse local helpers and theme tokens.
- Expose a reusable component API, not demo-only markup. Demos should cover the
  Material variants and meaningful states without duplicating near-identical
  examples.
- Keep changes limited to the selected task. Do not add, edit, or remove tests.
- Regenerate artifacts with project scripts; never edit generated files by
  hand.

## Workflow

1. Pick the first dependency-ready unchecked task.
2. Implement the component family, demos, route, sidebar entry, and generated
   code artifacts.
3. Do not add, edit, or remove tests. Keep the existing tests unchanged.
4. Run `vp check`, `vp test`, and `vp run build`.
5. Mark the task checked only after validation passes.
6. Commit the implementation and checkbox together with
   `feat: add material <component> component gallery`.
7. Automatically proceed to the next unchecked task; repeat until every task
   is checked, then stop and report the summary.

## Explicit Exclusions

- Input chips
- The dragged chip state
- The dial time picker
- The expressive loading-indicator shape-morph animation

## Component Mapping

| Material Design component      | React Aria component(s)                                                                      | shadcn component(s) | Real component(s)                                                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons                        | `Button`, `ToggleButton`                                                                     |                     | `Button` via React Aria `Button`<br>`ToggleButton` via React Aria `ToggleButton`                                                                                    |
| Icon buttons                   | `Button`, `ToggleButton`                                                                     |                     | `IconButton` via `Button`<br>`ToggleIconButton` via `ToggleButton`<br><br>Depends on: `Button`, `ToggleButton`                                                      |
| Divider                        | `Separator`                                                                                  |                     | `Divider` via React Aria `Separator`                                                                                                                                |
| Checkbox                       | `Checkbox`, `CheckboxGroup`                                                                  |                     | `Checkbox`, `CheckboxGroup`                                                                                                                                         |
| Radio button                   | `Radio`, `RadioGroup`                                                                        |                     | `RadioButton`, `RadioGroup`                                                                                                                                         |
| Switch                         | `Switch`                                                                                     |                     | `Switch`                                                                                                                                                            |
| Sliders                        | `Slider`                                                                                     |                     | `Slider`, `RangeSlider` via React Aria `Slider`                                                                                                                     |
| Text fields                    | `TextField`, `Input`, `TextArea`                                                             |                     | `TextField`, `TextArea`                                                                                                                                             |
| Loading indicator              |                                                                                              | `Spinner`           | `LoadingIndicator` via shadcn `Spinner`<br><br>Skipped: expressive shape-morph animation                                                                            |
| Progress indicators            | `ProgressBar`                                                                                |                     | `LinearProgressIndicator`, `CircularProgressIndicator` via `ProgressBar`                                                                                            |
| Badges                         |                                                                                              | `Badge`             | `Badge`, `BadgeAnchor`                                                                                                                                              |
| Cards                          |                                                                                              | `Card`              | `Card`, `CardHeader`, `CardContent`, `CardActions`                                                                                                                  |
| Button groups                  | `Toolbar`, `ToggleButtonGroup`                                                               |                     | `ButtonGroup` via `Toolbar`<br>`ToggleButtonGroup` via React Aria `ToggleButtonGroup`<br><br>Depends on: `Button`, `ToggleButton`, `IconButton`, `ToggleIconButton` |
| Extended FABs                  | `Button`                                                                                     |                     | `ExtendedFABButton` via React Aria `Button`<br><br>Depends on: `Button`                                                                                             |
| Floating action buttons (FABs) | `Button`                                                                                     |                     | `FABButton` via React Aria `Button`<br><br>Depends on: `Button`, `IconButton`                                                                                       |
| Menus                          | `Menu`, `MenuTrigger`, `Popover`                                                             |                     | `Menu`, `MenuTrigger`, `MenuItem`, `MenuSection`, `Submenu`<br><br>Depends on: `Button`, `IconButton`, `Divider`                                                    |
| FAB menu                       | `Menu`, `MenuTrigger`, `Popover`                                                             |                     | `FABMenu`, `FABMenuItem` via React Aria `Menu`<br><br>Depends on: `FABButton`, `Menu`                                                                               |
| Segmented buttons              | `ToggleButtonGroup`, `ToggleButton`                                                          |                     | `SegmentedButtonGroup`, `SegmentedButton`<br><br>Depends on: `ToggleButton`, `ToggleIconButton`                                                                     |
| Split buttons                  | `Button`, `MenuTrigger`, `Menu`, `Popover`                                                   |                     | `SplitButton`<br><br>Depends on: `Button`, `IconButton`, `Menu`                                                                                                     |
| Chips                          | `TagGroup`, `TagList`, `Tag`                                                                 |                     | `ChipGroup`, `ChipList`, `Chip`<br><br>Skipped: `InputChip`, dragged state                                                                                          |
| Tabs                           | `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel`                                            |                     | `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel`                                                                                                                   |
| Dialogs                        | `Modal`, `Dialog`, `DialogTrigger`                                                           |                     | `Dialog`, `FullScreenDialog`<br><br>Depends on: `Button`, `IconButton`                                                                                              |
| Lists                          | `GridList`, `GridListItem`                                                                   |                     | `List`, `ListItem`, `ListSection`<br><br>Depends on: `Divider`, `Checkbox`, `RadioButton`, `IconButton`                                                             |
| Search                         | `SearchField`, `Autocomplete`, `ListBox`, `Modal`, `Dialog`                                  |                     | `SearchBar` via `SearchField`<br>`SearchView` via `Autocomplete`, `ListBox`, and `Dialog`<br><br>Depends on: `TextField`, `IconButton`, `List`, `Dialog`            |
| Date pickers                   | `DatePicker`, `DateRangePicker`, `Calendar`, `RangeCalendar`, `DateField`, `Modal`, `Dialog` |                     | `DatePicker`, `DateRangePicker`, `ModalDatePicker`, `ModalDateInput`<br><br>Depends on: `TextField`, `IconButton`, `Dialog`                                         |
| Time pickers                   | `TimeField`, `Modal`, `Dialog`                                                               |                     | `TimePickerInput` via `TimeField` and `Modal`<br><br>Depends on: `TextField`, `Dialog`<br><br>Skipped: dial time picker                                             |
| Snackbar                       | `UNSTABLE_Toast`, `UNSTABLE_ToastRegion`, `UNSTABLE_ToastQueue`                              |                     | `Snackbar`, `SnackbarRegion`<br><br>Depends on: `Button`, `IconButton`                                                                                              |
| Bottom sheets                  |                                                                                              | `Drawer`            | `BottomSheet`, `BottomSheetTrigger`, `BottomSheetContent`<br><br>Depends on: `Button`, `IconButton`                                                                 |
| Side sheets                    |                                                                                              | `Sidebar`, `Sheet`  | `StandardSideSheet` via `Sidebar`<br>`ModalSideSheet` via `Sheet`<br><br>Depends on: `Button`, `IconButton`                                                         |
| Navigation bar                 | `Link`                                                                                       |                     | `NavigationBar`, `NavigationBarItem`<br><br>Depends on: `Badge`                                                                                                     |
| Navigation drawer              |                                                                                              | `Sidebar`, `Sheet`  | `StandardNavigationDrawer`, `ModalNavigationDrawer`, `NavigationDrawerItem`<br><br>Depends on: `List`, `Divider`, `ModalSideSheet`                                  |
| Navigation rail                |                                                                                              | `Sidebar`           | `NavigationRail`, `NavigationRailItem`<br><br>Depends on: `List`, `Badge`, `FABButton`                                                                              |
| Toolbars                       | `Toolbar`, `Group`                                                                           |                     | `Toolbar`, `ToolbarGroup`<br><br>Depends on: buttons, button groups, text fields, dividers, and FABs                                                                |
| App bars                       | `Toolbar`, `SearchField`                                                                     |                     | `AppBar`, `SearchAppBar`<br><br>Depends on: `Toolbar`, `SearchBar`, `IconButton`, `Chip`                                                                            |
| Carousel                       |                                                                                              | `Carousel`          | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`<br><br>Depends on: `Card`, `IconButton`                                           |
| Tooltips                       | `Tooltip`, `TooltipTrigger`, `Popover`, `Dialog`                                             |                     | `Tooltip` via React Aria `Tooltip`<br>`RichTooltip` via `Popover` and `Dialog`<br><br>Depends on: `Button`, `IconButton`, `Dialog`                                  |

## Tasks

- [x] Buttons (`73b464a`, `332a572`, `55b7fd3`, `5d78282`)
- [x] Icon buttons
- [x] Divider
- [x] Checkbox
- [x] Radio button
- [x] Switch
- [x] Sliders
- [x] Text fields
- [x] Loading indicator
- [x] Progress indicators
- [x] Badges (`d67ebb2`)
- [x] Cards
- [x] Button groups
- [x] Extended FABs
- [x] Floating action buttons (FABs)
- [x] Menus
- [x] FAB menu
- [x] Segmented buttons
- [x] Split buttons
- [x] Chips (`3a4d48b`)
- [x] Tabs (`640f4a4`)
- [x] Dialogs
- [x] Lists
- [x] Search
- [x] Date pickers
- [x] Time pickers
- [x] Snackbar
- [x] Bottom sheets
- [x] Side sheets
- [x] Navigation bar
- [x] Navigation drawer
- [ ] Navigation rail
- [ ] Toolbars
- [ ] App bars
- [ ] Carousel
- [ ] Tooltips
