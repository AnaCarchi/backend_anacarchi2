import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UseGuards, Controller } from "@nestjs/common";

// Extiende AuthGuard para añadir lógica personalizada
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Access denied');
    }
    return true;
  }
}

// Controlador protegido por JwtAuthGuard
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {}
