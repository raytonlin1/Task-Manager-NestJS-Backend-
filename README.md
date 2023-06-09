# Task Manager
> This task manager allows users to log in and create, update and delete
tasks that they want to remember. There is also a unique search feature for users to search and filter tasks, something that other task managers don't do.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][https://www.npmjs.com/package/react-native-expo-localstorage]

![](header.png)

## Installation

Copy the github repository.

## Development setup

Copy the github repository to an IDE like VS Code, and run npm install
while in the main folder. Then, run npm start.

```
npm start
```

## Release History
* 0.1.1
    * CHANGE: Made logs more descriptive
    * ADD: Added communication to a front-end
* 0.1.0
    * The first proper release
    * CHANGE: Update docs (module code remains unchanged)
    * ADD: Added authentication
    * FIX: Fixed various bugs
* 0.0.1
    * Work in progress

## Meta

Rayton Lin – [@uwaterloo](https://twitter.com/uwaterloo) – raytonlin@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/raytonlin1/request](https://github.com/raytonlin1/)

## Contributing

1. Fork it (<https://github.com/raytonlin1/Task-Manager-NestJS-Backend-/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki

### Tech Stack
This Project uses uses Server Side Capabilities of NodeJS.       



### Updates :
- Added SSO with NestJS


### Backend Architecture / System's Design

### End Points
| End Point      |   Port Number | HTTP Method   |           Description                   |  Required User registration |
| :---            | :----:  |    :----:     |          :----:                           | ---:   |
| /auth/signup    | 3000 | POST          | To sign up a new user                        |  No |
| /auth/signin    | 3000 | POST          | To sign in an existing user                        |  No |
| /tasks    | 3000 | GET          | Get all tasks made by the signed in user based on search filters.                       |  Yes |
| /tasks/get/:id    | 3000 | GET          | Get the task with the given id.                      |  Yes |
| /tasks/delete/:id    | 3000 | DELETE          | Delete the task with the given id.                      |  Yes |
| /tasks/update/:id/status    | 3000 | PATCH          | Update the task with the given id with a new status given the body parameters.                      |  Yes |
| /tasks/create    | 3000 | POST          | Create a new task, given the body parameters.                    |  Yes |

### Different Models 

###### - User Model 
id: string; (unique) 

username: string; (unique)

password: string;

tasks: Task[]; (One to many with users)

###### - Task Model   
id: string; (unique)

title: string; 

description: string;

status: TaskStatus; (TasksStatus can be Open, In Progress, or Done)

user: User; (Many to one with tasks)
 
