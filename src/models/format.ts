import sql from '@/lib/db'

import { Format } from '@/models/models'

export async function getFormats(user_id: number) : Promise<Format[]> {
  try {
    const sqlformats = await sql`SELECT * from formats WHERE user_id = ${user_id} AND delete_time IS NULL order by create_time desc`
    const formats: Format[] = sqlformats.map((row) => ({
      id: row.id,
      userID: row.user_id,
      name: row.name,
      equation: row.equation,
      createTime: row.create_time,
      deleteTime: row.delete_time,
    }))
    return formats
  } catch (error) {
    console.error('Error getformats:', error)
    throw error
  }
}

export async function addFormat(format: Format) : Promise<boolean> {
  console.log('format:', format)
  await sql`
        INSERT INTO formats (user_id, name, equation, create_time)
        VALUES (${format.userID}, ${format.name}, ${format.equation}, now());
      `
  return true
}

export async function deleteFormat(userID: number, formatID: number) : Promise<boolean> {
  await sql`UPDATE formats SET delete_time = now() where user_id = ${userID} AND id = ${formatID};`
  return true
}
