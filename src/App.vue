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
  | Check out my projects below (reload page for new NFTs and click images to view on OpenSea).
  br
  | You can now also buy NFTs with credit card on OpenSea!

.nft-container
    NFTSeries(
        v-for='nft in featured_nfts'
        :nftName='nft.nft_name'
        :nftUrl='nft.nft_url'
        :imageUrl='nft.image_url'
        :seriesName='nft.series_name'
        :seriesUrl='nft.series_url'
        :seriesDescription='nft.series_description'
        :featured='true'
      )

h2 Testimonials
.quotes
  .quote
    p NFT Collector&nbsp;
      a(href='https://twitter.com/ghostlasers') ghostlasers
      | &nbsp;about the Colorful Distortion Collection:
      br
      | "my favorite, is his generative evolutionary take on AbEx, Abstract Expressionism, [...] this fucking looks like Mark Rothko fighting Agnes Martin in an Octagon designed by Bridget Riley, with fucking Barnett Newman or Ad Reinhardt as the referee"

h2 All projects
.nft-container
  NFTSeries(
        v-for='nft in nfts'
        :nftName='nft.nft_name'
        :nftUrl='nft.nft_url'
        :imageUrl='nft.image_url'
        :seriesName='nft.series_name'
        :seriesUrl='nft.series_url'
        :seriesDescription='nft.series_description'
        :featured='false'
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
      nfts: [],
      featured_nfts: [],
    }
  },

    methods: {
    async getData() {
      this.nfts = []
      this.featured_nfts = []
      const response = await axios.get('https://space.pigu.ch/pifragile/get-nft-series/');
      let nfts = response.data;
      for(let nft of nfts) {
        console.log(nft)
        console.log(nft.priority)
        if(nft.priority > 1000) {
          this.featured_nfts.push(nft)
        } else {
          this.nfts.push(nft)
        }
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

.quotes {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: space-evenly;

  max-width: 100vw;
}

.quote{
  padding: 10px;
  max-width: 400px;
  background-color: cornsilk;
}

</style>
