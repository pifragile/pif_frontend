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


.loader(v-if='isLoading')
    ring-loader(:loading="isLoading" color="#000000")
div(v-else)
  .nft-container
    NFTSeries(
      v-for='nft in featured_nfts'
      :nftName='nft.nft_name'
      :nftUrl='nft.nft_url'
      :image='nft.image'
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

    .quote.virtualgallery
      p Check out the piece Crypto Warriors #0002 in this&nbsp;
        a(href='https://oncyber.io/rehearsal') virtual gallery
        | .
      img.virtualgallery(src="./assets/virtualgallery.png")
  h2 All projects
  .nft-container
    NFTSeries(
      v-for='nft in nfts'
      :nftName='nft.nft_name'
      :nftUrl='nft.nft_url'
      :image='nft.image'
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
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NFTSeries,
    RingLoader
  },
  data() {
    return {
      nfts: [],
      featured_nfts: [],
      isLoading: true,
    }
  },

  methods: {
    async getData() {
      this.nfts = []
      this.featured_nfts = []
      const response = await axios.get('https://space.pifragile.com/pifragile/get-nft-series/');
      let nfts = response.data;
      for (let nft of nfts) {
        let image = new Image();
        image.src = nft['image_url'];
        image.className='nft';
        image.style='width:100%'
        nft['image'] = image;
        if (nft.priority > 1000) {
          this.featured_nfts.push(nft)
        } else {
          this.nfts.push(nft)
        }
      }
    },
    async waitForImages() {
      const imagesToPreload = this.nfts.map(x => x['image']).concat(this.featured_nfts.map(x => x['image']));
      const images = imagesToPreload.map(image => {
        return new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      Promise.all(images).then(() => {
        console.log("Images loaded!");
        this.isLoading = false;
        console.log(imagesToPreload);
      }).catch(error => {
        console.error("Some image(s) failed loading!");
        console.error(error.message)
      });
    },


  },

  async created() {
    await this.getData();
    await this.waitForImages();
  },


  mounted() {
    let twitterScript = document.createElement('script')
    twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.head.appendChild(twitterScript)
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=VT323');

body {
  font-family: 'VT323', sans-serif;
  background-color: #fff70f;
  padding: 0px 20px 0px 20px;
}

.nft-container {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: space-evenly;

  max-width: 100vw;
}

.footer {
  width: 100vw;
  padding-top: 100px;
  padding-bottom: 10px;
  text-align: center;
}

.quotes {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: space-evenly;

  max-width: 100vw;
}

.quote {
  padding: 10px;
  max-width: 400px;
  background-color: cornsilk;
  margin: 3px;
}

img.virtualgallery {
  max-width: 200px;
}

.quote.virtualgallery {
  text-align: center;
}

.loader {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 100vw;
  padding-top: 10vh;
}
</style>
