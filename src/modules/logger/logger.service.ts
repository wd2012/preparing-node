import { Injectable } from '@nestjs/common';
import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonDailyRotateFile from 'winston-daily-rotate-file';

// https://docs.nestjs.com/techniques/logger#extend-built-in-logger
/**
 * @description: 自定义日志服务
 */
@Injectable()
export class LoggerService {
  private logger: winston.Logger;
  constructor() {
    const rotateTransport = new WinstonDailyRotateFile({
      // 日志文件名
      filename: 'application-%DATE%.log',
      // 日志文件名日期格式
      datePattern: 'YYYY-MM-DD HH:mm:ss',
      // 日志目录(tip：开发环境logs目录和src同级，生产环境单独设置目录路径)
      // TODO:暂时没有线上存放日志的地方
      dirname: 'logs',
      zippedArchive: true,
      // 日志文件最大大小
      maxSize: '20m',
      // 日志文件最大保存时间
      maxFiles: '14d',
      // 日志格式
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('Blog Server Logger...', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    });
    this.logger = winston.createLogger({
      transports: [rotateTransport, new winston.transports.Console()],
    });
  }
  public log(message: string) {
    this.logger.info(' info ==> ' + message);
  }

  public warn(message: string) {
    this.logger.warn(' warn ==> ' + message);
  }

  public error(message: string, trace: string) {
    this.logger.error(' error ==> ' + message, { trace });
  }

  public debug(message: string) {
    this.logger.debug(' debug ==> ' + message);
  }

  public verbose(message: string) {
    this.logger.verbose(' verbose ==> ' + message);
  }
}
