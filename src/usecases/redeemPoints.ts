import { CustomerRepo } from "../domain/CustomerRepo";

export class RedeemPoints {
  constructor(private repo: CustomerRepo) {}

  run(customerId: string, points: number): string | null {
    const customer = this.repo.getById(customerId);

    if (!customer) {
      return "Customer not found";
    }

    const ok = customer.takePoints(points);

    if (!ok) {
      return "Not enough points";
    }

    this.repo.save(customer);

    if (customer.getPoints() < 10) {
      return `Warning: Customer ${customerId} has low balance (${customer.getPoints()}) points.`;
    }

    return null;
  }
}
