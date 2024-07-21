import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Format } from '@/models/models'
import FormatsVar from './FormatEntryVar'

const FormatsByDB = ({ userID } : { userID: number }) => {
  const [dbFormats, setdbFormats] = useState([])

  useEffect(() => {
    const getformats = async () => {
      try {
        const res = await axios.get('/api/mock/formats')
        if (res.status === 200) {
          console.debug('dbFormats:', res.data.formats)

          const newFormats = res.data.formats.map((format: Format) => {
            try {
              format.equation = JSON.parse(format.equation as string)
              return format
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: format.name, equation: {} }
            }
          })

          // setdbFormats(res.data.formats)
          console.debug('newFormats:', newFormats)
          setdbFormats(newFormats)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getformats()

    console.debug('dbFormats:', dbFormats)
  }, [userID]) // Depend on userID to refetch when it changes

  return (
    <div className="parent-div-for-formats">
      {dbFormats.map((format : Format) => (
        <FormatsVar key={format.id} format={format} />
      ))}
    </div>
  )
}

export default FormatsByDB
