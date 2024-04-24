import bcrypt from 'bcrypt'

import sql from './db.mjs'
import { users, formats, orders} from '../src/app/lib/placeholder-data.mobile.js'

async function seedUsers() {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        mobile NUMERIC(11) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        create_time TIMESTAMP NOT NULL,
        delete_time TIMESTAMP,
        modify_time TIMESTAMP
      );
    `;
      // mobile BIGINT NOT NULL UNIQUE,

    console.log(`Created "users" table`);
    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE users_id_seq RESTART WITH 10000;`

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
        INSERT INTO users (name, mobile, password, create_time)
        VALUES (${user.name}, ${user.mobile}, ${hashedPassword}, now())
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      alterTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedFormats() {
  try {
    // Create the "formats" table if it doesn't exist
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS formats (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    delete_timestamp TIMESTAMP
  );
`;

    console.log(`Created "formats" table`);

    // Insert data into the "formats" table
    const insertedFormats = await Promise.all(
      formats.map(
        (format) => sql`
        INSERT INTO formats (user_id, name, timestamp)
        VALUES (${format.user_id}, ${format.name}, ${format.timestamp})
      `,
      ),
    );

    console.log(`Seeded ${insertedFormats.length} formats`);

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE formats_id_seq RESTART WITH 10000;`

    return {
      createTable,
      alterTable,
      formats: insertedFormats,
    };
  } catch (error) {
    console.error('Error seeding formats:', error);
    throw error;
  }
}


async function seedOrders() {
  try {
    // Create the "orders" table if it doesn't exist
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    format_id BIGINT NOT NULL,

    note VARCHAR(255) NOT NULL,
    width NUMERIC(5, 1) NOT NULL,
    height NUMERIC(5, 1) NOT NULL,
    shang_xia_gui NUMERIC(5,1) NOT NULL,
    shang_xia_fang NUMERIC(5,1) NOT NULL,
    guang_qi NUMERIC(5,1) NOT NULL,
    gou_qi NUMERIC(5,1) NOT NULL,
    bian_feng NUMERIC(5,1) NOT NULL,
    glass_width NUMERIC(5,1) NOT NULL,
    glass_height NUMERIC(5,1) NOT NULL,

    timestamp TIMESTAMP NOT NULL
  );
`;

/*
    note: string; // 备注
    format: string;
*/

    console.log(`Created "orders" table`);

    // -- Alter the sequence to start from 10000
    const alterTable = await sql`ALTER SEQUENCE orders_id_seq RESTART WITH 10000;`




    



    // Insert data into the "orders" table
    const insertedOrders = await Promise.all(
      orders.map(
        (order) => sql`
        INSERT INTO orders (user_id, format_id, note, width, height, shang_xia_gui, shang_xia_fang, guang_qi, gou_qi, bian_feng, glass_width, glass_height, timestamp)
        VALUES (${order.user_id}, ${order.format_id}, ${order.note}, ${order.width}, ${order.height}, ${order.shang_xia_gui}, ${order.shang_xia_fang}, ${order.guang_qi}, ${order.gou_qi}, ${order.bian_feng}, ${order.glass_width}, ${order.glass_height}, ${order.timestamp})
      `,
      ),
    );

    console.log(`Seeded ${insertedOrders.length} orders`);

    return {
      createTable,
      alterTable,
      orders: insertedOrders,
    };
  } catch (error) {
    console.error('Error seeding orders:', error);
    throw error;
  }
}

async function main() {
  await seedUsers();
  // await seedFormats();
  // await seedOrders();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
