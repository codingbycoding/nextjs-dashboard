import {
  faAddressCard, /* faBell */ faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'

import {
  faBug,
  /*
  faCalculator,
  faChartPie,
  faDroplet,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  */
  faCode,
  faGauge,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/app/ui/dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/app/ui/dashboard/Sidebar/SidebarNavItem'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faCode} href="/calculation">
        下料
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/formats">
        样式
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/glasses">
        玻璃
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/colors">
        型材
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/customers">
        客户
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faGauge} href="/">
        仪表盘
        <small className="ms-auto"><Badge bg="info" className="ms-auto">新</Badge></small>
      </SidebarNavItem>
      {/*
      <SidebarNavItem icon={faCode} href="/pokemons">
        样例
        <small className="ms-auto"><Badge bg="danger" className="ms-auto">DEMO</Badge></small>
      </SidebarNavItem>
      */}

      <SidebarNavTitle>Extras</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Pages">
        <SidebarNavItem icon={faRightToBracket} href="login">Login</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">Register</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">Error 404</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">Docs</SidebarNavItem>
    </ul>
  )
}
