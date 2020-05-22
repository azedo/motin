/* global fetch */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import './App.css'
import Modal from './components/Modal'

const Header = styled.div`
  height: 50px;
  padding: 12px;
  font-size: 48px;
  text-align: left;
`

const Card = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`

const CardContent = styled.div`
  padding: 10px;
  height: 100%;

  &:hover {
    background-color: lightgrey;
  }
`

const App = () => {
  const [fornecedores, setFornecedores] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState({})
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await (
          await fetch(
            'https://api.airtable.com/v0/appJqUbXilt8QG73R/Fornecedores?view=Grid%20view&api_key=key3h0orLfvwRORrf'
          )
        ).json()

        setFornecedores(data.records)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <Header>MOTIN</Header>

      {error}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridGap: '48px',
          padding: '24px',
        }}
      >
        {fornecedores.length > 0 &&
          fornecedores.map(({ id, fields }) => (
            <Card
              key={id}
              onClick={() => {
                console.log({ id })
                setOpenModal(true)
                setSelected(fornecedores.find((f) => f.id === id))
              }}
            >
              <CardContent>
                <div
                  style={{
                    height: '200px',
                    width: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundImage:
                      fields.Foto &&
                      `url(${fields.Foto[0].thumbnails.large?.url})`,
                    backgroundColor: 'red',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    margin: '0 auto',
                  }}
                >
                  {!fields.Foto && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '80px',
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      {fields.Nome.slice(0, 2)}
                    </div>
                  )}
                </div>

                <h2
                  style={{
                    borderBottom: '2px solid black',
                    paddingBottom: '6px',
                  }}
                >
                  {fields.Nome}
                </h2>

                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 'bold' }}>
                    {fields['Área / Serviço']}
                  </p>

                  {fields.Whatsapp && (
                    <p>
                      Whatsapp:{' '}
                      <a href={`https://wa.me/5548${fields.Whatsapp}`}>
                        {fields.Whatsapp}
                      </a>
                    </p>
                  )}

                  {fields.Telefone && (
                    <p>
                      Telefone:{' '}
                      <a href={`tel:${fields.Telefone}`}>{fields.Telefone}</a>
                    </p>
                  )}

                  {fields['e-mail'] && (
                    <p>
                      e-mail:{' '}
                      <a href={`mailto:${fields['e-mail']}`}>
                        {fields['e-mail']}
                      </a>
                    </p>
                  )}

                  {fields['Valor (Hora)'] && (
                    <p>
                      Valor (Hora):{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(fields['Valor (Hora)'])}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <>
            <div
              style={{
                height: '200px',
                width: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundImage:
                  selected.fields.Foto &&
                  `url(${selected.fields.Foto[0].thumbnails.large?.url})`,
                backgroundColor: 'red',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                margin: '0 auto',
              }}
            >
              {!selected.fields.Foto && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '80px',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {selected.fields.Nome.slice(0, 2)}
                </div>
              )}
            </div>

            <h2
              style={{
                borderBottom: '2px solid black',
                paddingBottom: '6px',
              }}
            >
              {selected.fields.Nome}
            </h2>

            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: 'bold' }}>{selected['Área / Serviço']}</p>

              {selected.fields.Whatsapp && (
                <p>
                  Whatsapp:{' '}
                  <a href={`https://wa.me/5548${selected.fields.Whatsapp}`}>
                    {selected.fields.Whatsapp}
                  </a>
                </p>
              )}

              {selected.fields.Telefone && (
                <p>
                  Telefone:{' '}
                  <a href={`tel:${selected.fields.Telefone}`}>
                    {selected.fields.Telefone}
                  </a>
                </p>
              )}

              {selected.fields['e-mail'] && (
                <p>
                  e-mail:{' '}
                  <a href={`mailto:${selected['e-mail']}`}>
                    {selected.fields['e-mail']}
                  </a>
                </p>
              )}

              {selected.fields['Valor (Hora)'] && (
                <p>
                  Valor (Hora):{' '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(selected.fields['Valor (Hora)'])}
                </p>
              )}

              {selected.fields['Referências'] && (
                <p>{selected.fields['Referências']}</p>
              )}
            </div>
          </>
        </Modal>
      )}
    </div>
  )
}

export default App
