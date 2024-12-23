## Add Filter Widget

### How to run

1. `npm install`
2. `npm run dev`
3. navigate to `http://localhost:5173/`
4. `npm run test` to run tests

### Technologies Used

1. react
2. react-router-dom
3. typescript
4. ContextAPI
5. vite
6. fuse.js
7. eslint
8. prettier
9. react-datepicker
10. jest
11. react-window

### Code Structure

1. Centralized Context (i.e. store) for managing shared data and functionality
2. Hooks for managing complex state related to searching, filter, key navigation, handling date input, outside click event handling, and managing dropdowns
3. Feature components, with moderate state
4. Base components for re-usable building blocks, with little to no state

### Functionality

1. Fuzzy match search for column names
2. Fuzzy match search for values with set lists of strings (i.e. tags)
3. Keyboard navigation through full flow. User can complete adding a filter solely through keyboard navigation, or can choose to use mouse events.
4. Supports multiple values types: string, number, date, multi-select (tags), boolean
5. Since average user adds just a few filters, will maintain a fixed height for first row of chips
6. Meets accessibility standards
7. Unit test coverage
8. Responsive design for mobile web
9. Virtualized rendering of dropdown items for large data set performance

### Future improvements

1. General cleanup
2. Potential multi-select options for the operator dropdown
3. Additional validation for value inputs
4. Aditional performance optimizations for very large datasets (debounced search, lazy loading)
5. UI polish and fixes
6. Localization / internationalization
