<script>
  import {
    createContract,
    createDataItemSigner,
    readState,
    writeInteraction,
  } from "@permaweb/ao-sdk";

  // contract src
  let src = "dfccC-_ih0Xl2_zhj8pTIUZF03QNfV2xu68pVzxSIQ0";
  let contracts = {};
  let contractState = null;

  async function doCreateContract(name) {
    if (globalThis.arweaveWallet) {
      await globalThis.arweaveWallet.connect(["SIGN_TRANSACTION"]);
    }

    const result = await createContract(
      src,
      { inbox: [] },
      createDataItemSigner(globalThis.arweaveWallet),
      []
    );
    console.log(result);
  }

  async function doReadState(contract) {
    globalThis.DEBUG = "*";
    console.log(contract);
    try {
      const result = await readState(contract);
      contractState = result;
    } catch (e) {
      console.log(e);
    }
  }
</script>

<h1>AO Demo</h1>
<hr />
<div>
  <h3>Step 1: Create Contracts</h3>
  <button on:click={() => doCreateContract("A")}>Create Contract A</button>
  <button>Create Contract B</button>
</div>
<hr />
<div>
  <h3>Step 2: Send Message from Contract A</h3>
  <form>
    <input type="text" placeholder="Message" />
    <button>Send</button>
  </form>
</div>
<hr />
<div>
  <h3>Step 3: Send Message from Contract B</h3>
  <form>
    <input type="text" placeholder="Message" />
    <button>Send</button>
  </form>
</div>
<hr />
<button
  on:click={() => doReadState("N4W3Aw5H-iJYbhm24CEXv0ULjJA_-ilgO053Yk9pzgg")}
  >ReadState</button
>
{#if contractState}
  <div>JSON.stringify(contractState)</div>
{/if}
