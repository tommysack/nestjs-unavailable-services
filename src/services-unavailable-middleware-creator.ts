import { mixin, NestMiddleware, Type } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function ServicesUnavailableMiddlewareCreator(options: any): Type<NestMiddleware> {

  class ServicesUnavailableMiddleware implements NestMiddleware {    

    use(req: Request, res: Response, next: NextFunction) { 

      const appUnavailableContentType = typeof options.appUnavailableContentType != null ? options.appUnavailableContentType : "application/json; charset=utf-8";
      const appUnavailableStatus = typeof options.appUnavailableStatus != null ? options.appUnavailableStatus : 503;
      const appUnavailableMessage = typeof options.appUnavailableMessage != null ? options.appUnavailableMessage : '{"status": "unavailable", "message": "Service unavailable"}';
       
      const appUnavailableFrom = typeof options.appUnavailableFrom != null ?  options.appUnavailableFrom : '';
      const appUnavailableTo = typeof options.appUnavailableTo != null ?  options.appUnavailableTo : '';

      if (typeof appUnavailableFrom != null) {
        const timeNow = Date.now() / 1000;
        const timeFrom = new Date(appUnavailableFrom).getTime() / 1000;      
        if (timeNow > timeFrom) {
          if (typeof appUnavailableTo != null) {
            const timeTo = new Date(appUnavailableTo).getTime() / 1000;  
            if (timeNow > timeTo) {            
              next();
            }
            else {// timeFrom < timeNow < timeTo            
              res
              .contentType(appUnavailableContentType)
              .status(appUnavailableStatus)
              .send(appUnavailableMessage);
            }
          }
          else {// timenow > timeFrom and no unavailableTo
            res
            .contentType(appUnavailableContentType)
            .status(appUnavailableStatus)
            .send(appUnavailableMessage);
          }
        }
        else {// timenow < timeFrom
          next();
        }
      }
      else {// no configuration
        next();
      }    
    }

  }

  return mixin(ServicesUnavailableMiddleware);

}
