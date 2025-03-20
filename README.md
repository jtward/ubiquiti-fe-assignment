# Ubiquiti Front-End Developer Test Assignment

This repository contains the code for James Ward's implementation of Ubiquiti's Front-end developer test assignment.


## Third-party libraries used

 - The project was created via Vite's React + Typescript template.
 - Styled-components is used for styling.
 - React-router is used for routing.
 - TanStack Query is used for data fetching and caching, although the data itself is hardcoded in the app.
 - Downshift is used for the search box and filters menu


## Notabe UI/UX features

 - Search, filters and selected layout are retained after navigating to a product and back.
 - The previous and next buttons on the device page take into account the filters and search applied on the list view.
 - Search and filter dropdown menus are animated.
 - Device JSON is shown inline when the "show" button is clicked.


## Notable changes from spec

 - The device details are more compact, more consistent with the rest of the design, and easier to scan visually because of the smaller distance between the labels and values, facilitated by aligning the values to the left rather than the right.

 - The focus styling of items in the product line filter menu was made more consistent with the main device list items rather than using the specified checkbox focus styling.

 - The number of different colors was limited, increasing consistency, and some colors were added where no good color existed (e.g. disabled next and previous navigation buttons on the device details page).


## Future work

 - **UIDB data**: this should be fetched via an API rather than hardcoded into the app, so that it can be updated independently. This API can map the UIDB to a format tailored to the app, reducing data transfer. It can also provide a stable format, perhaps by using graphQL, eliminating some complexity on the client-side.

 - **Theming and localization**: Currently these systems are basic, especially theming, and require work to get to a place where the app can be themed or localized. Ideally themes and localization strings can be provided via and API so they can be updated independently.

 - **Testing**: Tests were added to the HighlightedText component for demonstration but additional tests are needed. End-to-end tests using e.g. Playwright would be very useful. For example, you could test that the list is filtered when you select filters and enter a search, that the device details are displayed when you click on an item, and that the list is shown again when you click back.