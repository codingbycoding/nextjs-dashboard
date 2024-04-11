import sql from '@/lib/db'

import bcrypt from 'bcrypt'

export interface User {
  id: number;
  name: string;
  mobile: string;
  password: string;
}

export async function getUserByName(name: string) {
  try {
    // const users = await sql`SELECT * from users WHERE name = ${name} or mobile = ${mobile}`
    const users = await sql`SELECT * from users WHERE name = ${name}`
    if (Array.isArray(users) && users.length === 1) {
      return users[0]
    }

    return undefined
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

export async function getUserByMobile(mobile: string) : Promise<User | undefined> {
  try {
    const users = await sql`SELECT * from users WHERE mobile = ${mobile}`
    if (Array.isArray(users) && users.length === 1) {
      return users[0] as User
    }

    return undefined
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

export async function addUser(user: User) : Promise<boolean> {
  const oldUser = await getUserByMobile(user.mobile)
  if (oldUser?.mobile === user.mobile) {
    return false
  }

  const hashedPassword = await bcrypt.hash(user.password, 10)
  await sql`
        INSERT INTO users (name, mobile, password)
        VALUES (${user.name}, ${user.mobile}, ${hashedPassword})
        ON CONFLICT (mobile) DO NOTHING;
      `
  return true
}

export async function comparePassword(password: string, user: User | undefined) {
  if (user === undefined) {
    return false
  }
  const match = await bcrypt.compare(password, user.password)
  return match
}
