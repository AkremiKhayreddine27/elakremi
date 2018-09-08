import { PropertiesEffects } from './properties.effect';
import { ReservationsEffects } from './reservations.effect';
import { ServicesEffects } from './services.effect';
import { PaymentsEffects } from './payments.effect';
import { DocumentsEffects } from './documents.effect';
import { AuthEffects } from './auth.effect';
export const effects: any[] = [AuthEffects, PropertiesEffects, ReservationsEffects, ServicesEffects,PaymentsEffects, DocumentsEffects];
export * from './auth.effect';
export * from './properties.effect';
export * from './reservations.effect';
export * from './services.effect';
export * from './payments.effect';
export * from './documents.effect';