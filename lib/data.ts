// lib/data.ts

export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type OrderType = {
  id: number;
  customer: string;
  amount: number;
  status: "Delivered" | "Pending" | "Shipped";
};

export type UserType = {
  id: number;
  name: string;
};

// ✅ Fixed: added id
export const productsData: ProductType[] = [
  { id: "1", name: "iPhone 13", price: 70000, stock: 25 },
  { id: "2", name: "Samsung S21", price: 60000, stock: 15 },
  { id: "3", name: "OnePlus 11", price: 50000, stock: 10 },
];

export const ordersData: OrderType[] = [
  { id: 101, customer: "Ravi", amount: 1200, status: "Delivered" },
  { id: 102, customer: "Sita", amount: 800, status: "Pending" },
  { id: 103, customer: "Arjun", amount: 1500, status: "Shipped" },
];

export const usersData: UserType[] = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Sita" },
  { id: 3, name: "Arjun" },
];