import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Glass } from '@/models/models'
import GlassesVar from './GlassEntryVar'

const GlassesByDB = ({ userID } : { userID: number }) => {
  const [dbGlasses, setDbGlasses] = useState([])

  useEffect(() => {
    const getGlasses = async () => {
      try {
        const res = await axios.get('/api/mock/glasses')
        if (res.status === 200) {
          console.debug('res.data.:', res.data)
          console.debug('dbGlasses:', res.data.glasses)
          // setdbGlasses(res.data.glasses)
          const { glasses } = res.data
          console.debug('newGlasses:', glasses)
          setDbGlasses(glasses)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getGlasses()

    console.debug('dbGlasses:', dbGlasses)
  }, [userID]) // Depend on userID to refetch when it changes

  return (
    <div className="parent-div-for-glasses">
      {dbGlasses && dbGlasses.map((glass : Glass) => (
        <GlassesVar key={glass.id} glass={glass} />
      ))}
    </div>
  )
}

export default GlassesByDB
