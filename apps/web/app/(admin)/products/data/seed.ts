import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, priorities, statuses } from "./data"

const tasks = Array.from({ length: 100 }, () => ({
  id: faker.number.int({ min: 100000000000, max: 999999999999 }),
  name: faker.commerce.product(),
  category: {
    name: faker.commerce.productAdjective(),
    id: faker.number.int()
  },
  price: Number(faker.commerce.price()),
  manufacture: faker.commerce.department(),
  publishedDate: faker.date.recent(),
  status: faker.helpers.arrayElement(statuses).value,
  brand: faker.commerce.department(),
  mfrPartNumber: faker.commerce.isbn(),
  description: faker.commerce.productDescription(),
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
}))

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")
