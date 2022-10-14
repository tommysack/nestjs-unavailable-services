# NestJS unavailable services

This is a Middleware to manage the services temporarily unavailable due to maintenance.<br/>
You can set this parameters:<br>
- <i>appUnavailableFrom</i> is mandatory string of type 'mm/dd/yyyy hh:mm:ss'<br>
- <i>appUnavailableTo</i> is optional string of type 'mm/dd/yyyy hh:mm:ss'<br>
- <i>appUnavailableContentType</i> is optional string, if you doesn't set the parameter then the default is 'application/json; charset=utf-8'<br>
- <i>appUnavailableStatus</i> is optional number, if you doesn't set the parameter then the default is 503<br>
- <i>appUnavailableMessage</i> is optional string, if you doesn't set the parameter then the default is '{"status": "unavailable", "message": "Service unavailable"}'<br>


## Installation

```bash
$ npm i nestjs-unavailable-services
```

## How to use

If you want to maintain your services in FooController from 12/30/2022 01:00:00 to 12/30/2022 01:00:00, then in your app.module.ts:<br>
```code
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(
      ServicesUnavailableMiddlewareCreator({
        appUnavailableContentType: 'application/json; charset=utf-8',
        appUnavailableStatus: 503,
        appUnavailableMessage: '{"status": "unavailable", "message": "Service unavailable from 12/30/2022 01:00:00 to 12/30/2022 02:00:00"}',
        appUnavailableFrom: '12/30/2022 01:00:00',
        appUnavailableTo: '12/30/2022 02:00:00'
      })
    )
    .forRoutes(FooController);
  }  
}
```

