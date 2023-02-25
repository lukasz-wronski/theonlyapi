# The Only API - one API to rule them all!

- Are you annoyed having multiple APIs and SDKs in your project?
- Are you tired of maintaining too many dependencies? 
- Do you hate browsing documentations and learning new stuff?
- Have you looked for one size fits all solution but never found any?

Well... fear no more cause the The Only API is here!

### Highlights

- Strongly typed
- Infinite number of methods to call
- Supports all possible response data models
- Asynchronous
- Open source (duh!)
- Did I mentioned it's strongly typed?

## Getting Started

The Only API is available on NPM. To install it in your project type:

```
$ npm install theapi
```

then create an instance of it providing an OpenAI API key

```
const api = TheAPI("sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
```

## Usage

For each call The Only API requires to provide a function name you'd like to call, input parameters and then inside AsType method, a signature of the result data type you'd like to get.
