import { useEffect } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {

  // ---------------------- DECLARAÇÕES ----------------------

  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  // ---------------------- FUNÇÃO DE LIMPAR ----------------------

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  // ---------------------- FUNÇÃO DE ADICIONAR NUMEROS ----------------------

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${num}`);
  };

  // ---------------------- FUNÇÃO DE SOMAR OS NUMEROS ----------------------

  const handleSumNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('+');
    } else {
      const sum = Number(firstNumber) + Number(currentNumber);
      setCurrentNumber(String(sum));
      setOperation('');
    }
  };

  // ---------------------- FUNÇÃO DE SUBTRAIR OS NUMEROS ----------------------

  const handleMinusNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('-');
    } else {
      const sum = Number(firstNumber) - Number(currentNumber);
      setCurrentNumber(String(sum));
      setOperation('');
    }
  };

  // ---------------------- FUNÇÃO DE MULTIPLICAR OS NUMEROS ----------------------

  const handleMultiNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('*');
    } else {
      const sum = Number(firstNumber) * Number(currentNumber);
      setCurrentNumber(String(sum));
      setOperation('');
    }
  };

  // ---------------------- FUNÇÃO DE DIVIDIR OS NUMEROS ----------------------

  const handleDivNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('/');
    } else {
      const sum = Number(firstNumber) / Number(currentNumber);
      setCurrentNumber(String(sum));
      setOperation('');
    }
  };

  // ---------------------- FUNÇÃO DE VIRGULA ----------------------

  const handleAddComma = () => {
    if (!currentNumber.includes('.')) {
      setCurrentNumber((prev) => `${prev}.`);
    }
  };

  // ---------------------- FUNÇÃO DE IGUAL ----------------------

  const handleEquals = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      switch (operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleMinusNumbers();
          break;
        case '*':
          handleMultiNumbers();
          break;
        case '/':
          handleDivNumbers();
          break;
        default:
          break;
      }
    }
  };

  // ---------------------- CAPTURAR TECLAS PRESSIONADAS ----------------------

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      // Verifica se é um número
      if (!isNaN(key)) {
        handleAddNumber(key);
      }

      // Operações
      switch (key) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleMinusNumbers();
          break;
        case '*':
          handleMultiNumbers();
          break;
        case '/':
          handleDivNumbers();
          break;
        case '=':
        case 'Enter': // 'Enter' também como igual
          handleEquals();
          break;
        case 'c':
        case 'C':
          handleOnClear();
          break;
        case '.':
        case ',':
          handleAddComma();
          break;
        default:
          break;
      }
    };

    // Adiciona o listener de teclado
    window.addEventListener('keydown', handleKeyPress);

    // Limpa o listener ao desmontar o componente
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentNumber, firstNumber, operation]);

  // ---------------------- TELA ----------------------

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="*" onClick={handleMultiNumbers} />
          <Button label="/" onClick={handleDivNumbers} />
          <Button label="C" onClick={handleOnClear} />
          <Button label="." onClick={handleAddComma} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={handleMinusNumbers} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
