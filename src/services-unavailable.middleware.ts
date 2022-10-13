import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ServicesUnavailableMiddleware implements NestMiddleware {

  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {   
    
    const appUnavailableContenType = typeof this.configService.get("APP_UNAVAILABLE_CONTENTTYPE") != null ? this.configService.get("APP_UNAVAILABLE_CONTENTTYPE") : '';
    const appUnavailableStatus = typeof this.configService.get("APP_UNAVAILABLE_STATUS") != null ? this.configService.get("APP_UNAVAILABLE_STATUS") : 503;

    const unavailableFrom = typeof this.configService.get("APP_UNAVAILABLE_FROM") != null ? this.configService.get("APP_UNAVAILABLE_FROM") : '';
    const unavailableTo = typeof this.configService.get("APP_UNAVAILABLE_TO") != null ? this.configService.get("APP_UNAVAILABLE_TO") : '';
    if (unavailableFrom != '') {
      const timeNow = Date.now() / 1000;
      const timeFrom = new Date(unavailableFrom).getTime() / 1000;      
      if (timeNow > timeFrom) {
        if (unavailableTo != '') {
          const timeTo = new Date(unavailableTo).getTime() / 1000;  
          if (timeNow > timeTo) {            
            next();
          }
          else {// timeFrom < timeNow < timeTo            
            res
            .contentType(appUnavailableContenType)
            .status(appUnavailableStatus)
            .send(this.configService.get("APP_UNAVAILABLE_MESSAGE"));
          }
        }
        else {// timenow > timeFrom and no unavailableTo
          res
          .contentType(appUnavailableContenType)
          .status(appUnavailableStatus)
          .send(this.configService.get("APP_UNAVAILABLE_MESSAGE"));
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
