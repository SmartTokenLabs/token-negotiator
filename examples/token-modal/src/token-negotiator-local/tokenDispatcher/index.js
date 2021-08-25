// Request, Recieve, Dispatch, Display Tokens.

// OLD
// 1. Client negotiates
// 2. Outlet opens and provides tokens
// 3. Client shows tokens

// NEW
// 1. Client negotiates with an event listener
// 2. Outlet sends client HTML for Button
// 3. Client renders button
// 4. User clicks button
// 5. Outlet opens modal
// 6. User selects token
// 7. Outlet supplies token
// 8. User deselects token
// 9. Outlet revokes token
