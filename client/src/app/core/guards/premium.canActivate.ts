import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { billingStore } from '@modules/billing/billing.store';
import { environment } from 'src/environments/environment';

/**
 * Allows activation when the user has a paid (or trialing) subscription.
 * Uses `GET /billing/subscription` (with last-known cache for instant UX).
 * Local `authDisabled` bypasses the check.
 */
export const premiumGuard: CanActivateFn = async () => {
  if (environment.authDisabled) {
    return true;
  }

  const billing = inject(billingStore);
  const router = inject(Router);

  try {
    if (billing.isPaid()) {
      return true;
    }
    await billing.ensureLoaded();
    if (billing.isPaid()) {
      return true;
    }
  } catch {
    // Fall through to calendar redirect when billing is unavailable.
  }

  // Checkout/settings UI lands in P3; keep free users on the calendar for now.
  return router.createUrlTree(['/calendar']);
};
