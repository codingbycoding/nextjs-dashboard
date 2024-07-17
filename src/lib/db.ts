import postgres from 'postgres'

// const sql = postgres({ /* options */ }) // will use psql environment variables

// const sql = postgres({ host: process.env.POSTGRES_URL})
const sql = postgres(process.env.POSTGRES_URL || '', {})

export default sql
