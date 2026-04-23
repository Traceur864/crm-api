import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: any) {
    return this.authService.logout(Number(req.user.id));
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Req() req: any) {
    return this.authService.refreshTokens(
      Number(req.user.id),
      String(req.user.refreshToken),
    );
  }
}
