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

then import it and create an instance providing an OpenAI API key

```ts
import TheApi from "theonlyapi";

const api = TheAPI("sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
```

## Usage

For each call The Only API requires to provide a function name you'd like to call, input parameters and then inside AsType method, a signature of the result data type you'd like to get. You can start with something simple, like:

```ts
const result = await api.getTheAnswerToLifeTheUniverseAndEverything().AsType({ answer: Number})

// { answer: 42 }
```

you can try to use some simple parameters:

```ts
const result = await api.addTwoNumbers([21,37]).AsType({ answer: Number})

// { answer: 58 }
```

and some more complicated ones:

```ts
const result = await api
  .getAverageTemperature({ location: "Berlin", month: "June", unit: "F" })
  .AsType({ temperature: Number });
  
//{ temperature: 71.3 }
```

or try more complicated response types:

```ts
const result = await api
  .getBiggestCities({ country: "United States", page: 1, perPage: 5 })
  .AsType({
    data: [
      {
        name: String,
        population: Number,
        location: {
          lat: Number,
          lon: Number,
        },
      },
    ],
    page: Number,
    total: Number,
  });
  
/*
{
    "data": [
        {
            "name": "New York",
            "population": 8175133,
            "location": {
                "lat": 40.7128,
                "lon": -74.006
            }
        },
        {
            "name": "Los Angeles",
            "population": 3792621,
            "location": {
                "lat": 34.0522,
                "lon": -118.2437
            }
        },
        {
            "name": "Chicago",
            "population": 2695598,
            "location": {
                "lat": 41.8781,
                "lon": -87.6298
            }
        },
        {
            "name": "Houston",
            "population": 2239558,
            "location": {
                "lat": 29.7604,
                "lon": -95.3698
            }
        },
        {
            "name": "Phoenix",
            "population": 1626078,
            "location": {
                "lat": 33.4484,
                "lon": -112.074
            }
        }
    ],
    "page": 1,
    "total": 25
}
*/
```

