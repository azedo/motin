import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: auto;
  background: white;
  padding: 20px;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`

const Modal = ({ children, onClose }) => {
  const modalRoot = document.getElementById('portal')

  return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    <Container>
      <Content>{children}</Content>
      <Background
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />
    </Container>,
    // A DOM element
    modalRoot
  )
}

export default Modal
