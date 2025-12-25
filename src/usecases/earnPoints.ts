import { Customer } from "../domain/Customer";
import { CustomerRepo } from "../domain/CustomerRepo";

export class EarnPoints {
  constructor(private repo: CustomerRepo) {}

  run(customerId: string, points: number) {
    let customer = this.repo.getById(customerId);

    if (!customer) {
      customer = new Customer(customerId);
    }

    customer.addPoints(points);
    this.repo.save(customer);
  }
}
