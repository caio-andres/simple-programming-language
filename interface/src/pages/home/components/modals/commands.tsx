import { Modal, Button } from "react-bootstrap";
import "./Commands.css";

interface Props {
  openCommands: boolean;
  onClose: () => void;
  setOpenCommands: (value: boolean) => void;
}

export const Commands: React.FC<Props> = ({
  openCommands,
  onClose,
  setOpenCommands,
}) => {
  return (
    <Modal
      size="lg"
      show={openCommands}
      onHide={onClose}
      centered={true}
      contentClassName="bg-dark"
    >
      <Modal.Header style={{ borderBottom: "solid #10131B" }}>
        <Modal.Title className="fs-6">Comandos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                }}
              >
                Comando
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                }}
              >
                Descrição
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                }}
              >
                Exemplo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;assignment&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Atribuição de um valor a uma variável.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>x = 5;</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;if_statement&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Estrutura condicional que executa um bloco de código se uma
                condição for verdadeira, com possibilidade de um bloco{" "}
                <code>else</code>.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>if x &gt; 10 then y = 2; else y = 3;</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;while_statement&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Laço de repetição que executa um bloco de código enquanto uma
                condição for verdadeira.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>while x &lt; 10 do x = x + 1;</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;expression&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Expressão aritmética que pode envolver soma e subtração de
                termos.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>5 + 3 - 2</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;term&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Termo de uma expressão que pode envolver multiplicação e
                divisão.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>2 * 3 / 4</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;factor&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Elemento básico de uma expressão, como um número, uma variável,
                uma string ou uma subexpressão.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>7</code>
                <br />
                <code>x</code>
                <br />
                <code>(x + 2)</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;conditional&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Condição booleana
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>x &gt; 5</code>
                <br />
                <code>z == 0</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;relational_operator&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Operadores relacionais usados para comparar valores.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>==</code>
                <br />
                <code>&lt;</code>
                <br />
                <code>&gt;</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;name&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Nome de uma variável ou função.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>x</code>
                <br />
                <code>result</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>&lt;number&gt;</code>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Valor numérico inteiro.
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <code>5</code>
                <br />
                <code>100</code>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: "solid #10131B" }}>
        <Button
          className="link-close-btn"
          onClick={() => setOpenCommands(false)}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
