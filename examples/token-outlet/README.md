# Token outlet

The token outlet is a page that holds the tokens within. It also serves as a component
which can be loaded via an iframe for an end user to interact with their tokens.

# development

`npm run build` - build app
`npm run watch` - watch for changes
`npm run dev`   - build, watch, start server
`npm run start` - start server

# Issues

- The outlet is using exactly the same code from https://devcontickets.herokuapp.com/outlet/ however magic link does not work for this outlet app at present.

While this does not work copy the tokens into the local storage:

key: dcTokens 
value: [{"token":"MIGXMA4MAjExAgVhN2qd_gIBAARBBCiWVcTBF25EmWQVpzVE1_-YnrvBlKn9G8f2tLQTxekGLJAAWjCQWIQzl7JkLd3LJP03zGdsHZn0ZCu3jwjiNpIDQgBbJBY1Ctlp_czUwB85yF1e5kpZ-lQ_-UZ7jaCYSFoEx028Jit1HIDLCJezKdsNn9c9IO7-HC-_r2ZLaYQ9GGrbHA==","secret":"45845870684","id":"mah@mah.com","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGXMA4MAjExAgVhN2qd_gIBAARBBCiWVcTBF25EmWQVpzVE1_-YnrvBlKn9G8f2tLQTxekGLJAAWjCQWIQzl7JkLd3LJP03zGdsHZn0ZCu3jwjiNpIDQgBbJBY1Ctlp_czUwB85yF1e5kpZ-lQ_-UZ7jaCYSFoEx028Jit1HIDLCJezKdsNn9c9IO7-HC-_r2ZLaYQ9GGrbHA==&secret=45845870684&id=mah@mah.com"}]