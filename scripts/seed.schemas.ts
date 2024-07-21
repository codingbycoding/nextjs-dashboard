import bcrypt from 'bcrypt'

import { sql } from './db'
import { users, formats, glasses, orders, customers } from '../src/app/lib/placeholder-data.mobile'
import { User, Format, Glass, Order, Customer } from '../src/models/models'

async function seedUsers() {
  try {
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        mobile NUMERIC(11) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        create_time TIMESTAMP NOT NULL,
        delete_time TIMESTAMP,
        modify_time TIMESTAMP
      )
    `
    console.log('Created "users" table')
    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE users_id_seq RESTART WITH 10000`

    const insertedUsers = await Promise.all(
      users.map(async (user : User) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return sql`
        INSERT INTO users (name, mobile, password, create_time)
        VALUES (${user.name}, ${user.mobile}, ${hashedPassword}, now())
      `
      }),
    )

    console.log(`Seeded ${insertedUsers.length} users`)

    return {
      createTable,
      alterTable,
      users: insertedUsers,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedCustomers() {
  try {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS wdw_customers (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobile NUMERIC(11) NOT NULL,
    encoded_data VARCHAR(1024) NOT NULL,
    create_time TIMESTAMP NOT NULL,
    delete_time TIMESTAMP
  )
`

    console.log('Created "customers" table')

    const insertedCustomers = await Promise.all(
      customers.map(async (customer : Customer) => sql`
        INSERT INTO customers (user_id, name, create_time)
        VALUES (${customer.userID}, ${customer.name}, now()})
      `,
      ),
    )

    console.log(`Seeded ${insertedCustomers.length} customers`)

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE customers_id_seq RESTART WITH 10000`

    return {
      createTable,
      alterTable,
      customers: insertedCustomers,
    }
  } catch (error) {
    console.error('Error seeding customers:', error)
    throw error
  }
}

async function seedFormats() {
  try {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS formats (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    data VARCHAR(1024) NULL,
    create_time TIMESTAMP NOT NULL,
    delete_time TIMESTAMP
  )
`

    console.log('Created "formats" table')

    const insertedFormats = await Promise.all(
      formats.map(async (format : Format) => await sql`
        INSERT INTO formats (user_id, name, create_time)
        VALUES (${format.userID}, ${format.name}, now())
      `,
      ),
    )

    console.log(`Seeded ${insertedFormats.length} formats`)

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE formats_id_seq RESTART WITH 10000`

    return {
      createTable,
      alterTable,
      formats: insertedFormats,
    }
  } catch (error) {
    console.error('Error seeding formats:', error)
    throw error
  }
}

async function seedGlasses() {
  try {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS glasses (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    note VARCHAR(255) NULL,
    create_time TIMESTAMP NOT NULL,
    delete_time TIMESTAMP
  )
`

    console.log('Created "glasses" table')

    const insertedGlasses = await Promise.all(
      glasses.map(async (glass : Glass) => sql`
        INSERT INTO glasses (user_id, name, note, create_time)
        VALUES (${glass.userID}, ${glass.name}, ${glass.note}, now())
      `,
      ),
    )

    console.log(`Seeded ${insertedGlasses.length} glasses`)

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE glasses_id_seq RESTART WITH 10000`

    return {
      createTable,
      alterTable,
      glasses: insertedGlasses,
    }
  } catch (error) {
    console.error('Error seeding glasses:', error)
    throw error
  }
}

async function seedOrders() {
  try {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    format_id BIGINT NOT NULL,

    note VARCHAR(255) NOT NULL,
    width NUMERIC(5, 1) NOT NULL,
    height NUMERIC(5, 1) NOT NULL,

    create_time TIMESTAMP NOT NULL,
    delete_time TIMESTAMP
  )
`

    console.log('Created "orders" table')

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE orders_id_seq RESTART WITH 10000`

    const insertedOrders = await Promise.all(
      orders.map(async (order: Order) => sql`
        INSERT INTO orders (user_id, format_id, note, width, height, create_time)
        VALUES (${order.userID}, ${order.formatID}, ${order.note}, ${order.width}, ${order.height}, now())
      `,
      ),
    )

    console.log(`Seeded ${insertedOrders.length} orders`)

    return {
      createTable,
      alterTable,
      orders: insertedOrders,
    }
  } catch (error) {
    console.error('Error seeding orders:', error)
    throw error
  }
}

async function main() {
  await seedUsers()
  await seedFormats()
  await seedOrders()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  )
})
