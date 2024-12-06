import { Modal, Button } from "react-bootstrap";
import "./bnf.css";

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
        <div className="container mt-5">
          <ul className="list-unstyled">
            <li>
              <strong>&lt;program&gt;</strong> ::={" "}
              <code>&lt;statement&gt;</code> | <code>&lt;statement&gt;</code>{" "}
              <code>&lt;program&gt;</code>
            </li>
            <li>
              <strong>&lt;statement&gt;</strong> ::=
              <ul className="ms-4">
                <li>
                  <code>&lt;assignment&gt;</code>
                </li>
                <li>
                  <code>&lt;expression&gt;</code> <code>";"</code>
                </li>
                <li>
                  <code>&lt;if_statement&gt;</code>
                </li>
                <li>
                  <code>&lt;while_statement&gt;</code>
                </li>
                <li>
                  <code>&lt;print_statement&gt;</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>&lt;assignment&gt;</strong> ::= <code>&lt;name&gt;</code>{" "}
              <code>"="</code> <code>&lt;expression&gt;</code> <code>";"</code>
            </li>
            <li>
              <strong>&lt;if_statement&gt;</strong> ::= <code>"if"</code>{" "}
              <code>&lt;conditional&gt;</code> <code>"then"</code>{" "}
              <code>&lt;statement&gt;</code> [<code>"else"</code>{" "}
              <code>&lt;statement&gt;</code>] [<code>";"</code>]
            </li>
            <li>
              <strong>&lt;while_statement&gt;</strong> ::= <code>"while"</code>{" "}
              <code>&lt;conditional&gt;</code> <code>"do"</code>{" "}
              <code>&lt;statement&gt;</code> [<code>";"</code>]
            </li>
            <li>
              <strong>&lt;print_statement&gt;</strong> ::= <code>"print"</code>{" "}
              (<code>&lt;expression&gt;</code> | <code>&lt;string&gt;</code>){" "}
              <code>";"</code>
            </li>
            <li>
              <strong>&lt;expression&gt;</strong> ::= <code>&lt;term&gt;</code>{" "}
              &#123;<code>"+"</code> | <code>"-"</code>&#125;{" "}
              <code>&lt;term&gt;</code>
            </li>
            <li>
              <strong>&lt;term&gt;</strong> ::= <code>&lt;factor&gt;</code>{" "}
              &#123;<code>"*"</code> | <code>"/"</code>&#125;{" "}
              <code>&lt;factor&gt;</code>
            </li>
            <li>
              <strong>&lt;factor&gt;</strong> ::=
              <ul className="ms-4">
                <li>
                  <code>&lt;number&gt;</code>
                </li>
                <li>
                  <code>&lt;name&gt;</code>
                </li>
                <li>
                  <code>&lt;string&gt;</code>
                </li>
                <li>
                  ( <code>&lt;expression&gt;</code> )
                </li>
              </ul>
            </li>
            <li>
              <strong>&lt;conditional&gt;</strong> ::={" "}
              <code>&lt;bool_term&gt;</code> {<code>"OR"</code>}{" "}
              <code>&lt;bool_term&gt;</code>
            </li>
            <li>
              <strong>&lt;bool_term&gt;</strong> ::={" "}
              <code>&lt;bool_factor&gt;</code> {<code>"AND"</code>}{" "}
              <code>&lt;bool_factor&gt;</code>
            </li>
            <li>
              <strong>&lt;bool_factor&gt;</strong> ::={" "}
              <code>&lt;expression&gt;</code>{" "}
              <code>&lt;relational_operator&gt;</code>{" "}
              <code>&lt;expression&gt;</code>
            </li>
            <li>
              <strong>&lt;relational_operator&gt;</strong> ::= <code>"=="</code>{" "}
              | <code>"!="</code> | <code>"&lt;"</code> | <code>"&lt;="</code> |{" "}
              <code>"&gt;"</code> | <code>"&gt;="</code>
            </li>
            <li>
              <strong>&lt;number&gt;</strong> ::= <code>[0-9]+</code>
            </li>
            <li>
              <strong>&lt;name&gt;</strong> ::={" "}
              <code>[a-zA-Z_][a-zA-Z0-9_]*</code>
            </li>
            <li>
              <strong>&lt;string&gt;</strong> ::= <code>"&quot;.*&quot;"</code>
            </li>
          </ul>
        </div>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: "solid #10131B" }}>
        <Button className="link-close-btn" onClick={() => setOpenBNF(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
