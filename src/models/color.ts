import sql from '@/lib/db'

import { Color } from '@/models/models'

export async function getColors(user_id: number) : Promise<Color[]> {
  console.log('getColors user_id:', user_id)
  try {
    const sqlColors = await sql`SELECT * from colors WHERE user_id = ${user_id} AND delete_time IS NULL order by create_time desc`
    const colors: Color[] = sqlColors.map((row) => ({
      id: row.id,
      userID: row.user_id,
      name: row.name,
      note: row.note,
      createTime: row.create_time,
      deleteTime: row.delete_time,
    }))
    return colors
  } catch (error) {
    console.error('Error getColors:', error)
    throw error
  }
}

export async function addColor(color: Color) : Promise<boolean> {
  console.log('color:', color)
  await sql`
        INSERT INTO colors (user_id, name, note, create_time)
        VALUES (${color.userID}, ${color.name}, ${color.note}, now());
      `
  return true
}

export async function addColors(colors: Color[]): Promise<boolean> {
  const values = colors.map(
    (g) => `(${g.userID}, '${g.name}', '${g.note}', now())`,
  )

  if (values.length > 0) {
    const combinedQuery = `INSERT INTO colors (user_id, name, note, create_time) VALUES ${values.join(
      ',',
    )}`
    await sql`${combinedQuery}`
    return true
  }

  return false
}

/*
export async function addColors(colors: Color[]): Promise<boolean> {
  const values = colors.map(
    (g) => `(${g.userID}, '${g.name}', '${g.note}', now())`,
  )

  if (values.length > 0) {
    const combinedQuery = `INSERT INTO colors (user_id, name, note, create_time) VALUES ${values.join(
      ',',
    )}`
    await sql`${combinedQuery}`
    return true
  }

  return false
}
*/

/*
export async function addColors(colors: Color[]): Promise<boolean> {
  console.log('colors:', colors)
  const insertStatements = colors.map(
    (g) => `
    SELECT ${g.userID}, '${g.name}', '${g.note}', now()
  `,
  )
  const combinedQuery = insertStatements.join(' UNION ALL ')

  await sql`
    INSERT INTO colors (user_id, name, note, create_time)
    ${combinedQuery}
  `
  return true
}
*/

/*
export async function addColors(color: Color[]) : Promise<boolean> {
  console.log('color:', color)
  await sql`
        INSERT INTO colors (user_id, name, note, create_time)
        VALUES (${color.userID}, ${color.name}, ${color.note}, now());
      `
  return true
}
*/

export async function deleteColor(userID: number, colorID: number) : Promise<boolean> {
  await sql`UPDATE colors SET delete_time = now() where user_id = ${userID} AND id = ${colorID};`
  return true
}
