import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  const [data, setData] = useState({
    valor: null,
    cuotas: null,
    interes: null,
  });

  const [error, setError] = useState({ message: "", state: false });

  const [results, setResults] = useState([]);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    let mensuales = [];
    if (
      parseFloat(data.cuotas) <= 0 ||
      parseFloat(data.interes) <= 0 ||
      parseFloat(data.valor) <= 0
    ) {
      setError({
        ...error,
        message: "Los valores no pueden ser negativos",
        state: true,
      });
    } else {
      setError({ ...error, state: false });
      for (let index = 1; index < parseInt(data.cuotas) + 1; index++) {
        mensuales.push({
          mes: index,
          valorDeCuota: (
            parseFloat(data.valor) / parseInt(data.cuotas)
          ).toFixed(2),
          valorDeInteres: (
            parseFloat(data.valor) *
            parseInt(data.cuotas) *
            (parseFloat(data.interes) / 1200)
          ).toFixed(2),
          valorTotal: (
            parseFloat(data.valor) / parseInt(data.cuotas) +
            parseFloat(data.valor) *
              parseInt(data.cuotas) *
              (parseFloat(data.interes) / 1200)
          ).toFixed(2),
        });
        setResults(mensuales);
      }
    }
  };

  return (
    <Calculator className="App">
      <Inputs>
        <Input
          name="valor"
          placeholder="Valor del crédito (pesos)"
          type="number"
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          name="cuotas"
          placeholder="Número de cuotas (#)"
          type="number"
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          name="interes"
          placeholder="Tasa de interés (%)"
          type="number"
          onChange={(e) => handleOnChange(e)}
        />
      </Inputs>
      <Button onClick={(e) => handleOnClick(e)}>Calcular</Button>
      {error.state && <Error>{error.message}</Error>}
      {results.length !== 0 ? (
        <Table>
          <TableHead>
            <h1>Mes</h1>
            <h1>Valor de la cuota</h1>
            <h1>Valor del interés</h1>
            <h1>Valor total a pagar</h1>
          </TableHead>
          {results.map((result, index) => (
            <Row key={index}>
              <p>{result.mes}</p>
              <p>{result.valorDeCuota} pesos</p>
              <p>{result.valorDeInteres} pesos</p>
              <p>{result.valorTotal} pesos</p>
            </Row>
          ))}
        </Table>
      ) : (
        <Advice>No se ha calculado nada</Advice>
      )}
    </Calculator>
  );
}

export default App;

const Calculator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  padding: 15px 35px;
  border-radius: 5px;
  background: #0f0;
  margin: 20px;
  cursor: pointer;
  &:hover {
    background: #f00;
  }
`;
const Table = styled.div`
  width: 60%;
  border: 1px solid #333;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  color: #fff;
  border-bottom: 1px solid #333;
`;
const Advice = styled.h1`
  color: green;
`;
const TableHead = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #333;
  font-size: 10px;
  color: #fff;
`;
const Error = styled.h1`
  color: red;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 10px 20px;
  width: 500px;
  margin-top: 10px;
  font-size: 20px;
  outline: none;
  text-align: center;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  border-color: #fff;
  color: #fff;
`;
