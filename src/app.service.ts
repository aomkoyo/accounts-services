import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getStats() {
    return {
      package: {
        name: process.env.npm_package_name || 'Unknown',
        version: process.env.npm_package_version || 'Unknown',
        author: process.env.npm_package_author || 'Unknown',
      },
      pid: process.pid,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      platform: process.platform,
      version: process.version,
      arch: process.arch,
      cpuUsage: process.cpuUsage(),
    };
  }
}
