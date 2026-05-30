import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Enveloppe toutes les réponses dans un format standard.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(_ctx: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data: data ?? null,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
