<template lang="pug">
h1 Welcome to pifragile's NFTs!
h3 Generative Art by pifragile.
a.twitter-follow-button(href='https://twitter.com/pifragile?ref_src=twsrc%5Etfw' data-show-count='false') Follow @pifragile
h3
  | I am a programmer and NFT artist working with different flavors of generative art!
  br
  | If you need help with any technical issues concerning generative art, mint automation, smart contracts, metamask, etc... DM me on twitter. I have a Master&apos;s Degree in Computer Science and experience in those areas!
  br
  br
  | Check out my projects below (reload page for new NFTs and click images to view on OpenSea)
.nft-container
  NFTSeries(
        v-for='nft in nfts'
        :nftName='nft.nft_name'
        :nftUrl='nft.nft_url'
        :imageUrl='nft.image_url'
        :seriesName='nft.series_name'
        :seriesUrl='nft.series_url'
        :seriesDescription='nft.series_description'
      )
.footer
  |  &copy; 2021 by pifragile
</template>

<script>
import NFTSeries from './components/NFTSeries.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NFTSeries
  },
  data() {
    return {
      nfts: []
    }
  },

    methods: {
    async getData() {
      const response = await axios.get('https://space.pigu.ch/pifragile/get-nft-series/')
      this.nfts = response.data
      console.log(this.nfts)
    },
    async getData2() {
      try {
        const response = await this.$http.get(
          'https://space.pigu.ch/pifragile/get-nft-series/'
        );
        // JSON responses are automatically parsed.
        this.nfts = response.data;
        console.log(this.nfts);
      } catch (error) {
        console.log(error);
      }
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

<style>
@import url('https://fonts.googleapis.com/css?family=VT323');
body {
  font-family: 'VT323', sans-serif;
  background-color: #fff70f;
  padding:0px 20px 0px 20px;
}

.nft-container {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: space-evenly;

  max-width: 100vw;
}

.footer {
  padding-top:100px;
  text-align: center;
}

</style>
