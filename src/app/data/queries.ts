// Define QueryItem interface
interface QueryItem {
  tableQuery: string;
  query: string;
  tableFields: string[];
  data: any[];
}

// Import data
import Customers from "./customers";
import categories from "./categories";
import Products from "./products";
import Suppliers from "./suppliers";

// Define the QueryMap array using the QueryItem interface
const QueryMap: QueryItem[] = [
  {
    tableQuery: "CUSTOMERS",
    query: "select * from CUSTOMERS",
    tableFields: [
      "customerID",
      "companyName",
      "contactName",
      "contactTitle",
      "address",
      "city",
      "region",
      "postalCode",
      "country",
      "phone",
      "fax",
    ],
    data: Customers,
  },
  {
    tableQuery: "CATEGORIES",
    query: "select * from CATEGORIES",
    tableFields: ["categoryID", "categoryName", "description", "picture"],
    data: categories,
  },
  {
    tableQuery: "PRODUCTS",
    query: "select * from PRODUCTS",
    tableFields: [
      "productID",
      "productName",
      "supplierID",
      "categoryID",
      "quantityPerUnit",
      "unitPrice",
      "unitsInStock",
      "unitsOnOrder",
      "reorderLevel",
      "discontinued",
    ],
    data: Products,
  },
  {
    tableQuery: "SUPPLIERS",
    query: "select * from SUPPLIERS",
    tableFields: [
      "supplierID",
      "companyName",
      "contactName",
      "contactTitle",
      "address",
      "city",
      "region",
      "postalCode",
      "country",
      "phone",
      "fax",
      "homePage",
    ],
    data: Suppliers,
  },
];

export default QueryMap;
