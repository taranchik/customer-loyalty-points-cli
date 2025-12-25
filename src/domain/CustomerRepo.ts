import { Customer } from "./Customer";

export interface CustomerRepo {
  getById(id: string): Customer | null;
  save(customer: Customer): void;
}
