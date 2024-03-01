import logo from './logo.svg';
import './App.css';
import * as uint8arraytools from "uint8array-tools";
import nacl from "tweetnacl";
import base58 from "bs58";

function App() {

  async function signMessage() {
    const txId = "0x73770495abeca393c0c0507c2f96f8f2ee3589c429683ecf7bf2a7b055962f2b";
    const u8TxId = uint8arraytools.fromHex(txId.slice(2)); // uint8array tools does not expect the 0x prefix
    console.log(`u8TxId`, base58.decode("3ozYXfVgcdYqPbtdzfSufrJY8QUtrhPkb3bCbfbN9koy24iwAPbeZWsFg8MX9s75LftJRWU8zMUokmZnK2Y7gQ23"));
    const naclSig = nacl.sign.detached(u8TxId, base58.decode("3ozYXfVgcdYqPbtdzfSufrJY8QUtrhPkb3bCbfbN9koy24iwAPbeZWsFg8MX9s75LftJRWU8zMUokmZnK2Y7gQ23"));
    console.log(`naclSig`, naclSig);
    const provider = window.phantom?.solana;
    const signedMessage = await provider.signMessage(u8TxId, 'hex');
    console.log(`signedMessage`, signedMessage);
  }

  return (
    <div className="App">
      <button onClick={() => signMessage()}>Sign message</button>
    </div>
  );
}

export default App;
