// Libraries
import React from "react"

// Components
import Header from '../../components/Header'

// Styles
import './MainLayout.scss'


const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className='MainLayout'>
      <div className={'MainLayout__header'}>
        <Header/>
      </div>
      <div className={'MainLayout__body'}>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout
