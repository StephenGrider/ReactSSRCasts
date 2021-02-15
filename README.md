## ReactMono

### React Redux Express SSR Framework
ReactMono is completely free and open source framework.

ReactMono uses React and Redux for client side and nodejs with Express.js for server side.

### Installation
* Clone repository to local directory.
* Install node dependencies
    
    `npm install`
* Run mondodb docker container (docker-compose.yml)
    
    `docker-compose start`

    `docker-compose up` - if first time run

* `npm run dev` - run dev version
* open localhost:3001

### Requirement
* nodejs v12.0 and higher
* npm
* docker
* docker-compose

### Configurations
* production.env - production environment variables
  development.env - development mode environment variables
* config/default.json - common configurations
  config/production.json - production configs, rewrite default.json
  config/development.json - development configurations, rewrite default configs
* useSSR - turn on/off server side rendering

#### Create Module
```
cd src/modules/reactmono/test-user/ //example path
npm init -y
```
#### Istall Module
```
npm install --save ./src/modules/reactmono/test-user
```
