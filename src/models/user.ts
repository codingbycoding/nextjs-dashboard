import bcrypt from 'bcrypt'

import { User } from '@/models/models'
import sql from '@/lib/db'

export async function getUserByName(name: string) {
  try {
    const users = await sql`SELECT * from users WHERE name = ${name}`
    if (Array.isArray(users) && users.length === 1) {
      return users[0]
    }

    return undefined
  } catch (error) {
    console.error('getUserByName error:', error)
    throw error
  }
}

export async function getUserByMobile(mobile: number) : Promise<User | undefined> {
  try {
    const users = await sql`SELECT * from users WHERE mobile = ${mobile}`
    if (Array.isArray(users) && users.length === 1) {
      return users[0] as User
    }

    return undefined
  } catch (error) {
    console.error('getUserByMobile error:', error)
    throw error
  }
}

export async function addUser(inUser: User) : Promise<number> {
  const user = inUser
  if (user.name === undefined || user.name === '') {
    user.name = '3660'
  }

  const oldUser = await getUserByMobile(user.mobile)
  if (oldUser?.mobile === user.mobile) {
    console.error('user with mobile exist:', user.mobile)
    return 0
  }

  const hashedPassword = await bcrypt.hash(user.password, 10)
  const results = await sql`
        INSERT INTO users (name, mobile, password, create_time)
        VALUES (${user.name}, ${user.mobile}, ${hashedPassword}, now())
        ON CONFLICT (mobile) DO NOTHING
        RETURNING id`

  console.debug('addUser:', results)
  if (Array.isArray(results) && results.length === 1) {
    return results[0].id
  }
  return 0
}

export async function comparePassword(password: string, user: User | undefined) {
  if (user === undefined) {
    return false
  }
  const match = await bcrypt.compare(password, user.password)
  return match
}
