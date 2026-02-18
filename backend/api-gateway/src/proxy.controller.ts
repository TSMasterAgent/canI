import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import * as express from 'express';
import * as proxy from 'express-http-proxy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class ProxyController {
  @All('auth/*')
  async proxyAuth(@Req() req: express.Request, @Res() res: express.Response) {
    return (proxy as any)('localhost:3001')(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('projects*')
  async proxyProjects(@Req() req: express.Request, @Res() res: express.Response) {
    // Both /projects and /projects/test-cases go to projects service
    return (proxy as any)('localhost:3002')(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('reporting*')
  async proxyReporting(@Req() req: express.Request, @Res() res: express.Response) {
    return (proxy as any)('localhost:3003')(req, res);
  }
}
