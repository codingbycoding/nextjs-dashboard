import sql from '@/lib/db'

import { Glass } from '@/models/models'

export async function getGlasses(user_id: number) : Promise<Glass[]> {
  console.debug('getGlasses user_id:', user_id)

  try {
    const sqlGlasses = await sql`SELECT * from glasses WHERE user_id = ${user_id} AND delete_time IS NULL order by create_time desc`
    const glasses: Glass[] = sqlGlasses.map((row) => ({
      id: row.id,
      userID: row.user_id,
      name: row.name,
      note: row.note,
      createTime: row.create_time,
      deleteTime: row.delete_time,
    }))
    return glasses
  } catch (error) {
    console.error('Error getGlasses:', error)
    throw error
  }
}

export async function addGlass(glass: Glass) : Promise<boolean> {
  console.log('glass:', glass)
  await sql`
        INSERT INTO glasses (user_id, name, note, create_time)
        VALUES (${glass.userID}, ${glass.name}, ${glass.note}, now());
      `
  return true
}

export async function addGlasses(glasses: Glass[]): Promise<boolean> {
  const values = glasses.map(
    (g) => `(${g.userID}, '${g.name}', '${g.note}', now())`,
  )

  if (values.length > 0) {
    const combinedQuery = `INSERT INTO glasses (user_id, name, note, create_time) VALUES ${values.join(
      ',',
    )}`
    await sql`${combinedQuery}`
    return true
  }

  return false
}

/*
export async function addGlasses(glasses: Glass[]): Promise<boolean> {
  const values = glasses.map(
    (g) => `(${g.userID}, '${g.name}', '${g.note}', now())`,
  )

  if (values.length > 0) {
    const combinedQuery = `INSERT INTO glasses (user_id, name, note, create_time) VALUES ${values.join(
      ',',
    )}`
    await sql`${combinedQuery}`
    return true
  }

  return false
}
*/

/*
export async function addGlasses(glasses: Glass[]): Promise<boolean> {
  console.debug('glasses:', glasses)
  const insertStatements = glasses.map(
    (g) => `
    SELECT ${g.userID}, '${g.name}', '${g.note}', now()
  `,
  )
  const combinedQuery = insertStatements.join(' UNION ALL ')

  await sql`
    INSERT INTO glasses (user_id, name, note, create_time)
    ${combinedQuery}
  `
  return true
}
*/

/*
export async function addGlasses(glass: Glass[]) : Promise<boolean> {
  console.debug('glass:', glass)
  await sql`
        INSERT INTO glasses (user_id, name, note, create_time)
        VALUES (${glass.userID}, ${glass.name}, ${glass.note}, now());
      `
  return true
}
*/

export async function deleteGlass(userID: number, glassID: number) : Promise<boolean> {
  await sql`UPDATE glasses SET delete_time = now() where user_id = ${userID} AND id = ${glassID};`
  return true
}
