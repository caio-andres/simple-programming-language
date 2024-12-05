import { Modal, Button } from "react-bootstrap";
import { Table } from "../content/styles";

interface Props {
  openBNF: boolean;
  onClose: () => void;
  setOpenBNF: (value: boolean) => void;
}

export const BNF: React.FC<Props> = ({ openBNF, onClose, setOpenBNF }) => {
  return (
    <Modal
      size="lg"
      show={openBNF}
      onHide={onClose}
      centered={true}
      contentClassName="bg-dark"
    >
      <Modal.Header style={{ borderBottom: "solid #10131B" }}>
        <Modal.Title className="fs-6">BNF</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table border={1}>
          <thead className="th-header">
            <tr>
              <th scope="col" className="text-dark">
                SPL
              </th>
              <th scope="col" className="text-dark">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt;program&gt;</td>
              <td>
                Representa um programa composto por uma ou mais declarações.
              </td>
            </tr>
            <tr>
              <td>&lt;statement&gt;</td>
              <td>
                Uma instrução no programa, que pode ser uma atribuição, uma
                expressão seguida de ponto e vírgula, ou uma estrutura de
                controle (&lt;if&gt;, &lt;while&gt;, &lt;print&gt;).
              </td>
            </tr>
            <tr>
              <td>&lt;assignment&gt;</td>
              <td>
                Declaração de atribuição que associa o valor de uma expressão a
                um identificador.
              </td>
            </tr>
            <tr>
              <td>&lt;if_statement&gt;</td>
              <td>
                Estrutura condicional que avalia uma condição e executa um bloco
                de instruções com suporte opcional ao bloco &lt;else&gt;.
              </td>
            </tr>
            <tr>
              <td>&lt;while_statement&gt;</td>
              <td>
                Estrutura de repetição que executa um bloco de instruções
                enquanto a condição especificada for verdadeira.
              </td>
            </tr>
            <tr>
              <td>&lt;print_statement&gt;</td>
              <td>Imprime o valor de uma expressão ou string no console.</td>
            </tr>
            <tr>
              <td>&lt;expression&gt;</td>
              <td>
                Representa uma operação matemática, podendo conter termos com
                operadores de soma ou subtração.
              </td>
            </tr>
            <tr>
              <td>&lt;term&gt;</td>
              <td>
                Parte de uma expressão envolvendo multiplicação ou divisão de
                fatores.
              </td>
            </tr>
            <tr>
              <td>&lt;factor&gt;</td>
              <td>
                Elemento base de uma expressão: número, nome, string ou outra
                expressão entre parênteses.
              </td>
            </tr>
            <tr>
              <td>&lt;conditional&gt;</td>
              <td>
                Expressão booleana que avalia condições lógicas usando
                operadores &quot;OR&quot;.
              </td>
            </tr>
            <tr>
              <td>&lt;bool_term&gt;</td>
              <td>
                Subexpressão booleana usando operador lógico &quot;AND&quot;.
              </td>
            </tr>
            <tr>
              <td>&lt;bool_factor&gt;</td>
              <td>
                Representa uma comparação entre duas expressões usando
                operadores relacionais.
              </td>
            </tr>
            <tr>
              <td>&lt;relational_operator&gt;</td>
              <td>
                Operadores relacionais utilizados para comparar valores
                (&quot;==&quot;, &quot;!=&quot;, &quot;&lt;&quot;,
                &quot;&lt;=&quot;, &quot;&gt;&quot;, &quot;&gt;=&quot;).
              </td>
            </tr>
            <tr>
              <td>&lt;number&gt;</td>
              <td>Literal numérico composto por dígitos de 0 a 9.</td>
            </tr>
            <tr>
              <td>&lt;name&gt;</td>
              <td>
                Identificador válido começando com uma letra ou sublinhado,
                seguido por letras, números ou sublinhados.
              </td>
            </tr>
            <tr>
              <td>&lt;string&gt;</td>
              <td>Literal de string delimitada por aspas duplas.</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: "solid #10131B" }}>
        <Button className="link-close-btn" onClick={() => setOpenBNF(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
