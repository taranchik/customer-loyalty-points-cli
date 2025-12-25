import { CustomerRepo } from "../domain/CustomerRepo";
import { Customer } from "../domain/Customer";

export class InMemoryCustomerRepo implements CustomerRepo {
  private store = new Map<string, Customer>();

  getById(id: string) {
    return this.store.get(id) ?? null;
  }

  save(customer: Customer) {
    this.store.set(customer.id, customer);
  }
}
