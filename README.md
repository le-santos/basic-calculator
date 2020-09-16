# basic-calculator
Calculadora feita em html/css/js como atividade do Odin Project [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/calculator).

Confira aqui: [https://le-santos.github.io/basic-calculator/](https://le-santos.github.io/basic-calculator/)

## Como funciona?

Essa é uma calculadora simples com as 4 funções básicas (soma, adição, multiplicação, divisão).

Há 3 formas de realizar as operações:

**Operação única**
- Insira o primeiro operando
- Selecione o operador ( + - / x )
- Insira o segundo operando
- Aperte `< = >` para realizar o cálculo e mostrar resultado

**Operação encadeada**
- Insira o primeiro operando
- Selecione o operador ( + - / x )
- Insira o segundo operando
- Selecione outro operando para realizar o cálculo e encadear em outra operação.

**Operação abreviada**
- Insira o primeiro operando
- Selecione o operador ( + - / x )
- Aperte < = > para realizar o cálculo tendo o mesmo número como os dois operandos
Ex: `< 6 > < x > < = >` O resultado será: (6 * 6 ) = 36 


Outras infos:
- É possível operar via mouse (click event) ou teclado (keydown event)
- É possível utilizar números decimais
- O máximo número de dígitos é 13
- Divisão por 0 retorna o aviso *ERROR div/0*
- O botão `< del >` remove o último número inserido
- O botão `< C >` limpa o display, o operador selecionado e a lista de operandos


## Conhecimentos aplicados
Nesta atividade coloquei em prática elementos de CSS como Grids, Pseudo-classes, Color Gradients.
No Javascript apliquei os recursos de: 
- Manipulação de Arrays: push(), splice(), join(), includes()
- Event Listeners no DOM
- Module pattern 
```
const calculator = (() => {...})();
```
