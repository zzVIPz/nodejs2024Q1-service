# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing and running application

- rename .env.example to .env

- run

```
docker compose up
```

- wait until images are downloaded and extracted
- check logs to see app initializations successful status

- run

```
run npm test
```

## Troubleshooting

In case observing any issues with the app please check:

- There are no internet connections problems because of firewall/proxy/internet provider and all dependencies are installed
- DB was started - by using a cross-platform database tool (like DBeaver)
- run

```
docker compose up --build
```

- If you still see issues, please feel free to reach out me in Discord

## Api doc

run application and navigate to:

```
http://localhost:4000/api
```

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
