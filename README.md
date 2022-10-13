# NestJS unavailable services

This is a Middleware to manage the services temporarily unavailable due to maintenance.<br/>

## Installation

```bash
$ npm i nestjs-unavailable-services
```

## How to use

In your app.module.ts:<br>
```code
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ServicesUnavailableMiddleware)
    .forRoutes(FooController);
  }  
}
```

## Dependences

The ServicesUnavailableMiddleware use <i>ConfigService</i> so you must have imported ConfigModule in your app.<br/>
The configuration parameters you can set in your .env are:<br/>
```code
APP_UNAVAILABLE_FROM=12/30/2022 01:00:00
APP_UNAVAILABLE_TO=12/30/2022 02:00:00
APP_UNAVAILABLE_CONTENTTYPE=application/json; charset=utf-8
APP_UNAVAILABLE_STATUS=503
APP_UNAVAILABLE_MESSAGE={"status": "unavailable", "message": "Service unavailable from 01:00:00 to 02:00:00"}
```
