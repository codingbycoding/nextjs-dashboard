'use client'

import { useState } from 'react'
import { Button } from 'antd'

export default function CalcComp({ idd }) {
  interface Option {
    value: string;
    label: string;
  }

  interface OutputValues {
    guangGou: number;
    shangXiaFang: number;
    gouQi: number;
    bianFeng: number;
    shangXiaGui: number;
    glassWidth: number;
    glassHeight: number;
  }

  const options: Option[] = [
    { value: 'a', label: '打85移门料子' },
    { value: 'b', label: '极窄双扇1635' },
    { value: 'c', label: '极窄三联动1635(不锈钢下轨)' },
  ]

  const [selectedOption, setSelectedOption] = useState<string>('a')
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [heightError, setHeightError] = useState<string>('')

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const numberOrEmpty = (val: number) : string => (Number.isNaN(val) ? '' : val.toString())

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWidth(value)
    if (value && Number.isNaN(parseFloat(value))) {
      setWidthError('请输入有效的数字')
    } else {
      setWidthError('')
    }
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setHeight(value)
    if (value && Number.isNaN(parseFloat(value))) {
      setHeightError('请输入有效的数字')
    } else {
      setHeightError('')
    }
  }

  const calculateOutputA = (lwidth: string, lheight: string) : OutputValues => {
    const widthVal = parseFloat(lwidth)
    const heightVal = parseFloat(lheight)

    const guangGouVal = heightVal - 53
    const shangXiaFangVal = (widthVal - 35 + 85) / 2
    const gouQiVal = guangGouVal - 17
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 56
    const glassWidthVal = shangXiaFangVal - 148
    const glassHeightVal = guangGouVal - 148

    return {
      guangGou: guangGouVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: gouQiVal,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    }
  }

  const calculateOutputB = (lwidth: string, lheight: string) : OutputValues => {
    const widthVal = parseFloat(lwidth)
    const heightVal = parseFloat(lheight)

    const guangGouVal = heightVal - 85 + 7
    const shangXiaFangVal = (widthVal - 34 + 16) / 2
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 4
    const glassWidthVal = shangXiaFangVal - 18
    const glassHeightVal = guangGouVal - 18

    return {
      guangGou: guangGouVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: 0,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    }
  }

  const calculateOutputC = (inWidth: string, inHeight: string):OutputValues => {
    const widthVal = parseFloat(inWidth)
    const heightVal = parseFloat(inHeight)

    const guangGouVal = heightVal - 88 + 7
    const shangXiaFangVal = (widthVal - 34 + 32) / 3
    const gouQiVal = guangGouVal
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 4
    const glassWidthVal = shangXiaFangVal - 18
    const glassHeightVal = guangGouVal - 18

    return {
      guangGou: guangGouVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: gouQiVal,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    }
  }

  const formatValue = (value: number, decimalPlaces: number): number => {
    const isInteger = Number.isInteger(value)
    const formattedValue = isInteger ? value.toFixed(0) : value.toFixed(decimalPlaces)
    return Number.parseFloat(formattedValue)
  }

  const formatOutput = (lval: OutputValues) : OutputValues => ({
    guangGou: formatValue(lval.guangGou, 1),
    shangXiaFang: formatValue(lval.shangXiaFang, 1),
    gouQi: formatValue(lval.gouQi, 1),
    bianFeng: formatValue(lval.bianFeng, 1),
    shangXiaGui: formatValue(lval.shangXiaGui, 1),
    glassWidth: formatValue(lval.glassWidth, 1),
    glassHeight: formatValue(lval.glassHeight, 1),
  })

  const calculateOutputs = ():OutputValues => {
    let outputVal = {
      guangGou: 0,
      shangXiaFang: 0,
      gouQi: 0,
      bianFeng: 0,
      shangXiaGui: 0,
      glassWidth: 0,
      glassHeight: 0,
    }

    if (widthError || heightError) return outputVal
    switch (selectedOption) {
      case 'a':
        outputVal = calculateOutputA(width, height)
      // eslint-disable-next-line no-fallthrough
      case 'b':
        outputVal = calculateOutputB(width, height)
      // eslint-disable-next-line no-fallthrough
      case 'c':
        outputVal = calculateOutputC(width, height)
      // eslint-disable-next-line no-fallthrough
      default:
    }

    return formatOutput(outputVal)
  }

  const outputs = calculateOutputs()

  return (
    <div
      id={`calcComp-${idd}`}
      style={{
        display: 'flex', flexWrap: 'nowrap', height: '60px', margin: 0, padding: 0,
      }}
    >
      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 160, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`note-${idd}`}>备注</label>
        <input type="text" id={`note-${idd}`} style={{ maxWidth: 160 }} />
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`dropdown-${idd}`}>选择类型:</label>
        <select id={`dropdown-${idd}`} style={{ minHeight: 24 }} value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`width-${idd}`}>宽</label>
        <input type="text" id={`width-${idd}`} style={{ maxWidth: 80 }} value={width} onChange={handleWidthChange} />
        {widthError && <span style={{ color: 'red' }}>{widthError}</span>}
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`height-${idd}`}>高</label>
        <input type="text" id={`height-${idd}`} style={{ maxWidth: 80 }} value={height} onChange={handleHeightChange} />
        {heightError && <span style={{ color: 'red' }}>{heightError}</span>}
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`guang_gou-${idd}`}>
          {selectedOption === 'b' ? '光企(2支)' : '光企(4支)'}
        </label>
        <output id={`guang_gou-${idd}`}>{Number.isNaN(outputs.guangGou) ? '' : outputs.guangGou}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 120, maxWidth: 150, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`shang_xia_fang-${idd}`}>
          {selectedOption === 'c' ? '上下方(6支)' : '上下方(4支)'}
        </label>
        <output id={`shang_xia_fang-${idd}`}>{Number.isNaN(outputs.shangXiaFang) ? '' : outputs.shangXiaFang}</output>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`gou_qi-${idd}`}>
          {selectedOption === 'b' ? '' : '勾企'}
        </label>
        <output id={`gou_qi-${idd}`}>{selectedOption === 'b' ? '' : numberOrEmpty(outputs.gouQi)}</output>

      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`bian_feng-${idd}`}>
          边封
        </label>
        <output id={`bian_feng-${idd}`}>{Number.isNaN(outputs.bianFeng) ? '' : outputs.bianFeng}</output>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`shang_xia_gui-${idd}`}>
          上下轨
        </label>
        <output id={`shang_xia_gui-${idd}`}>{Number.isNaN(outputs.shangXiaGui) ? '' : outputs.shangXiaGui}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass_width-${idd}`}>
          玻璃宽度
        </label>
        <output id={`glass_width-${idd}`}>{Number.isNaN(outputs.glassWidth) ? '' : outputs.glassWidth}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass_height-${idd}`}>
          玻璃高度
        </label>
        <output id={`glass_height-${idd}`}>{Number.isNaN(calculateOutputs().glassHeight) ? '' : calculateOutputs().glassHeight}</output>

      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <Button type="primary">确认</Button>
      </div>

    </div>
  )
}
