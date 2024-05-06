import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Color } from '@/models/models'
import ColorsVar from './ColorEntryVar'

const ColorsByDB = ({ userID } : { userID: number }) => {
  const [dbColors, setDbColors] = useState([])

  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await axios.get('/api/mock/colors')
        if (res.status === 200) {
          console.log('res.data.:', res.data)
          console.log('dbColors:', res.data.colors)
          const { colors } = res.data
          console.log('newColors:', colors)
          setDbColors(colors)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getColors()

    console.log('dbColors:', dbColors)
  }, [userID]) 

  return (
    <div className="parent-div-for-colors">
      {dbColors && dbColors.map((color : Color) => (
        <ColorsVar key={color.id} color={color} />
      ))}
    </div>
  )
}

export default ColorsByDB
