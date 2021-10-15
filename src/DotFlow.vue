<template lang="pug">
h1 The DotFlow NFT Project
a.twitter-follow-button(href='https://twitter.com/dotflow_nft' data-show-count='false') Follow @dotflow_nft
.dotflow-container
  iframe(src="https://space.pifragile.com/nft/dotflow/nft/0")
  iframe(src="https://space.pifragile.com/nft/dotflow/nft/3")
  iframe(src="https://space.pifragile.com/nft/dotflow/nft/5")
  iframe(src="https://space.pifragile.com/nft/dotflow/nft/8")
p DotFlow is an NFT project by artist&nbsp;
  a(href='pifragile.com') pifragile
  | . There will be a total of 1024 DotFlow NFTs.
  br
  | DotFlow NFTs have the following 5 traits:
  ul
    li Size
    li Density
    li Color Scheme
    li Speed
    li Direction
h3 Contract Address:&nbsp;
  a(href="https://polygonscan.com/address/0x1103302c04e4f3ccF5C948Cfa1aAa690D2A569A8") 0x1103302c04e4f3ccF5C948Cfa1aAa690D2A569A8

h3 Opensea:&nbsp;
  a(href="https://opensea.io/collection/dot-flow") opensea.io/collection/dot-flow
hr
h1 Mint
div You can mint your DotFlow NFT here. A&nbsp;
  b.highlighted random DotFlow&nbsp;
  | will be generated for you and&nbsp;
  b.highlighted stored on the Polygon chain
  | !
  br
  | Connect you MetaMask wallet with a connection to Polygon Mainnet.
  br
  br
  button(v-on:click='connectMetamask') Connect Metamask
  br
  br
  | Price for 1 NFT: 50 MATIC.
  br
  | If you do not have MATIC available, you can also buy DotFlow NFTs on OpenSea on the&nbsp;
  a(href="") secondary market
  | !
br
button(v-on:click='mintNFT') Mint DotFlow NFT
hr
h1 Roadmap
ul
  li 100 followers on Twitter: 1 giveaway
  li 250 followers on Twitter: 2 giveaways
  li 400 followers on Twitter: 3 giveaways
  li 500 followers on Twitter:&nbsp;
    b.highlighted SALE STARTS
    |   --> 50 MATIC per NFT
hr
h1 The Algorithm
div The Dotlfow algorithm can be split up into 3 main parts:
h3 Traits picking
div In a first step the five traits (Size, Density, Color Scheme, Speed and Direction) are selected based
  | on predefined random distributions. The following values are available:
  ul
    li Size: Extra Small (15%), Small(20%), Medium(30%), Large(20%), Extra Large(15%)
    li Density : Extra Low (10%), Low (20%), Medium (40%), High (20%) Extra High (10%)
    li Color Scheme: Greed (25%), Red (25%), Blue (25%), Random (25%)
    li Speed: Slow (30%), Medium (30%), Fast (30%), Extreme (10%)
    li Direction: North (20%), North West (5%), West (20%), South West (5%), South (20%), South East (5%), East (20%), North East (5%)

h3 The Color Algorithm
div As a next step a sophisticated color picking algorithm developed by myself is used to select the background colors and the dots based on different modes, color properties and contrast.
  | The color and trait picking algorithm is implemented in Python.
h3 Animation
div As a final step, I use the JavaScript library p5.js to animate the dots. In total the entire algorithm combined is something like 300 lines of code.
hr
h1 Team
div Until this very moment the DotFlow team consists of just me,&nbsp;
  a(href='https://pifragile.com') pifragile
  | . I had to learn a lot and it is a wonderful journey.
  br
  | It has been hard - but very satisfying - work!
hr
h1 Gallery
.dotflow-container
  DotFlowItem(
    v-for='nft in nfts'
    :id='nft.id'
    :url='nft.animation_url'
    :colorScheme="nft['Color Scheme']"
    :direction="nft['Direction']"
    :size="nft['Size']"
    :speed="nft['Speed']"
    :density="nft['Density']"
    :name="nft.name"
  )
.footer
  |  &copy; 2021 by pifragile
</template>

<script>
import DotFlowItem from './components/DotFlowItem.vue'
import axios from 'axios'

export default {
  name: 'DotFlow',
  components: {
    DotFlowItem
  },
  data() {
    return {
      nfts: [],
      saleActive: false,
    }
  },

  methods: {
    async getData() {
      let baseUrl = 'https://space.pifragile.com/nft/dotflow/'
      let ids = []
      for (let j = 0; j < 3; j++) {
        let id;
        do {
          id = Math.round(Math.random() * 9);
        } while (ids.includes(id))
        ids.push(id);
        const response = await axios.get(baseUrl + 'meta/' + id);
        let nft = response.data;
        nft['id'] = id;
        for (let attribute of nft.attributes) {
          nft[attribute['trait_type']] = attribute['value'];
        }
        this.nfts.push(nft)
      }
      this.saleActive = (await axios.get(baseUrl + 'sale-active/')).data['active'];
    },
    async connectMetamask() {
      window.ethereum.request({method: 'eth_requestAccounts'});
    },
    async mintNFT() {
      let expectedChainId = '0x89'; //  '0x13881' Mumbai |  '0x89' is polygon mainnet
      let price = '0x2b5e3af16b1880000'; // 50 MATIC | '0x38d7ea4c68000'// 0.001 ETH | 0x16345785d8a0000 0.1
      let contractAddress = '0x2d2e134FDfadFe31Ba1641d5952dD0A78dde91CC';

      if (window.ethereum === undefined || window.ethereum.selectedAddress === undefined) {
        alert("Please connect metamask!");
        return;
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (!this.saleActive) {
        alert("Sale is not active!");
        return;
      }

      if (chainId !== expectedChainId) {
        alert("You need to be connected to Polygon Mainnet!");
        return;
      }

      const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        gasPrice: '0x01dcd65000', // customizable by user during MetaMask confirmation.
        gas: '0x1668C', // customizable by user during MetaMask confirmation.
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: price, // Only required to send ether to the recipient from the initiating external account.
        data: '0x1249c58b', // call mint function
        chainId: expectedChainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    },
  },

  created() {
    this.getData();
  },
  mounted() {
    let twitterScript = document.createElement('script')
    twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.head.appendChild(twitterScript)
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=VT323');

.footer {
  padding-top: 100px;
  text-align: center;
}

.dotflow-container {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: space-evenly;

  max-width: 100vw;
}

iframe {
  border: 0px;
  width: 200px;
  margin: 5px;
}

.highlighted {
  color: hotpink;
}

a:visited {
  color: black;
}

hr {
  border-top: 1px solid black;
  border-bottom: 0px;
  border-left: 0px;
  border-right: 0px;
  width: 5vw;
  margin-top: 40px;
  margin-bottom: 30px;
  margin-left:-30px;
}
</style>
