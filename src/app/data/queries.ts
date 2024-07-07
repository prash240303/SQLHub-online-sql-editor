import Customers from "./customers";
import categories from "./categories";
import Products from "./products";
import Suppliers from "./suppliers";

interface QueryItem {
  tableQuery: string;
  query: string;
  tableFields: string[];
  data: any[]; 
}

const QueryMap: QueryItem[] = [
  {
    tableQuery: "Customers",
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
    tableQuery: "Categories",
    query: "select * from CATEGORIES",
    tableFields: ["categoryID", "categoryName", "description", "picture"],
    data: categories,
  },
  {
    tableQuery: "Products",
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
    tableQuery: "Suppliers",
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
