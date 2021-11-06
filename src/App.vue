<template lang="pug">
p
  | Hi, I am an NFT artist and  programmer working with different flavors of generative art!
  br
  | I can help you with generative art, mint automation, smart contracts, metamask, etc... DM me on twitter. I have a Master&apos;s Degree in Computer Science from ETH Zürich and experience in those areas!
  br
  br
  | Check out my projects below (reload page for new NFTs and click images to view on OpenSea).
  br
  | You can now also buy NFTs with credit card on OpenSea!

p All the best, pifragile.


.loader(v-if='isLoading')
  div.text.loader-text Loading Collection...
  ring-loader(:loading="isLoading" color="#0000ff")
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
      :featured='false'
    )

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

  h2 Testimonials
.quotes
  .quote
    p NFT Collector&nbsp;
      a(href='https://twitter.com/ghostlasers') ghostlasers
      | &nbsp;about the Colorful Distortion Collection:
      br
      | "my favorite, is his generative evolutionary take on AbEx, Abstract Expressionism, [...] this fucking looks like Mark Rothko fighting Agnes Martin in an Octagon designed by Bridget Riley, with fucking Barnett Newman or Ad Reinhardt as the referee"

  .quote.virtualgallery.wrap-text
    p Check out the piece Crypto Warriors #0002 in this&nbsp;
      a(href='https://oncyber.io/rehearsal') virtual gallery
      | .
    img.virtualgallery(src="./assets/virtualgallery.png")


.sketchbook
p Sketchbook

p Glow
img.sketch(src='./assets/sketchbook/glow/glow1.png')
img.sketch(src='./assets/sketchbook/glow/glow2.png')
img.sketch(src='./assets/sketchbook/glow/glow3.png')
img.sketch(src='./assets/sketchbook/glow/glow4.png')


p White on Black
img.sketch(src='./assets/sketchbook/sketch1.png')
img.sketch(src='./assets/sketchbook/sketch2.png')
img.sketch(src='./assets/sketchbook/sketch3.png')

.footer
  a.twitter-follow-button(href='https://twitter.com/pifragile?ref_src=twsrc%5Etfw' data-show-count='false') Follow @pifragile
  br
  br
  | &copy; 2021 by pifragile

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
        image.style='width:100%;max-width:800px;'
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
  color: blue;
  background-color: #fff70f;
  padding: 0px 20px 0px 20px;
}

.nft-container {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: left;

  max-width: 100vw;
}

.footer {
  max-width: 100vw;
  padding-top: 100px;
  padding-bottom: 10px;
  text-align: center;
}

.quotes {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;

  justify-content: left;

  max-width: 100vw;
}

.quote {
  max-width: 100%;
  background-color: #ffff0a;
  padding: 10px;
  margin: 30px 30px 30px 0;

}

img.virtualgallery {
  max-width: 80vw;
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
  min-height: 40vh;
}

a:visited {
  color: blue;
}

a {
  color: blue;
}

a, h2, h3, p, .text {
    font-family: 'VT323', sans-serif;
  color: blue;
  font-size:calc(20px + 2.5vw);

  font-weight: bold;
    color: blue;
}

.sketchbook {
  max-width: 100vw;
}

.sketch {
  max-width: 60%;
  max-height: 60%;
  margin: 20px 0 0 0;
}

.loader-text{
  width: 100%;
  text-align: center;
  margin-bottom: -30px;
}
</style>
