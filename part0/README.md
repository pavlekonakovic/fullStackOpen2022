# Part 0 - Fundamentals of Web apps

Sequence diagrams are made using [Mermaid](https://mermaid-js.github.io/mermaid/#/sequenceDiagram) syntax for each exercise and depict the interaction between the browser and server in different situations.

## 0.4: New note
```mermaid
sequenceDiagram
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: HTTP status code 302 (URL redirect)

    note over browser: Server asks the browser to do a new HTTP GET request
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML-code

    note over browser: links in HTML code causes browser to fetch style sheet
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css

    note over browser: and script tag points to main.js
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: main.js

    note over browser: The browser executes JavaScript code that requests JSON data.
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{content: "hello everyone ", date: "2022-10-31T15:03:21.758Z"},…]

    note over browser: The broswer executes the event handler and renders notes 
```

## 0.5: Single page app

```mermaid
sequenceDiagram
    browser->>server: HTTP GET  https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: HTML- code
    browser->>server: HTTP GET  https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css
    browser->>server: HTTP GET  https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: spa.js

    note over browser: The browser executes JavaScript code that requests JSON data.
    browser->>server: HTTP GET  https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{content: "hello everyone ", date: "2022-10-31T15:03:21.758Z"},…]

    note over browser: The broswer executes the event handler and renders notes.
```

## 0.6: New note

```mermaid
sequenceDiagram
    note over browser: The browser sends new POST request to new_note_spa and contains new note as JSON data.
    browser->>server: HTTP POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa, {content: "new note", date: "2022-10-31T20:40:25.304Z"}
    server-->>browser: HTTP status code 201  {message: "note created"}

    note over server: The server does not ask for redirect, the browser stays on the same page, there are no more HTTP requests.
    note over browser: The broswer executes the event handler and renders notes.
```