// lib/data.ts

// Product type
export type ProductType = {
  name: string;
  price: number;
  stock: number;
};

// Products array
export const productsData: ProductType[] = [
  { name: "iPhone 13", price: 70000, stock: 25 },
  { name: "Samsung S21", price: 60000, stock: 15 },
  { name: "OnePlus 11", price: 50000, stock: 10 },
];

// Order type
export type OrderType = {
  id: number;
  customer: string;
  amount: number;
  status: "Delivered" | "Pending" | "Shipped";
};

// Orders array
export const ordersData: OrderType[] = [
  { id: 101, customer: "Ravi", amount: 1200, status: "Delivered" },
  { id: 102, customer: "Sita", amount: 800, status: "Pending" },
  { id: 103, customer: "Arjun", amount: 1500, status: "Shipped" },
];

// User type
export type UserType = {
  id: number;
  name: string;
};

// Users array
export const usersData: UserType[] = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Sita" },
  { id: 3, name: "Arjun" },
];