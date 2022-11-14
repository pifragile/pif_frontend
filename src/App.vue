<template lang="pug">
.columns.is-mobile.is-vcentered.is-flex
  .column(align="left").is-1-desktop.is-3-mobile.is-2-tablet
    figure.image
      img(src='./assets/pifragileLogo.png')

  .column
    text Generative Art by pifragile

.columns.is-flex-wrap-wrap.is-flex-direction-row
  NFTSeries(
    v-for='nft in nfts'
    :seriesName='nft.name'
    :imageUrl='nft.imageUrl'
    :seriesUrl='nft.url'
    :seriesDescription='nft.description'
  )

.columns.is-centered
  .column.has-text-centered
    text News

.columns.is-flex-wrap-wrap.is-flex-direction-row.is-justify-content-center
  NewsItem(
    title="I am part of the Expanded Cinema Exhibition at Kurzfilmtage Winterthur. Opening Nov 9 2022."
    link="https://www.oxydart.ch/de/ausstellungen/843/EXPANDED-CINEMA-KURZFILMTAGE-X-OXYD.html"
    :image-srcs="['winti.png', 'winti01.jpeg']"
    )

  NewsItem(
    title="I published an article about my first year as a generative artist."
    link="https://medium.com/@pifragile/nfts-art-and-tears-what-my-first-year-as-a-generative-art-rookie-felt-like-and-what-you-can-learn-500ebfc4c233"
    :image-srcs="['pifragile.png']"
    )

  NewsItem(
    title="My piece 0xZae was featured in the Doomscroll exhibition in Zürich in July, 2022."
        link="https://ensoie.com/en/news/doomscroll"
    :image-srcs="['zae.png', 'doomscrollOpening.jpeg']"
    )

  NewsItem(
    title="My piece Cosmic Sun N001 was feaured in the NFT Art Week Shenzhen 2021"
    :image-srcs="['shenzhen/shenzen.jpg', 'shenzhen/CosmicSunN001.png', 'shenzhen/shenzhen1.jpg']"
    )

//.sketchbook
//p Sketchbook
//
//p Glow
//img.sketch(src='./assets/sketchbook/glow/glow1.png')
//img.sketch(src='./assets/sketchbook/glow/glow2.png')
//img.sketch(src='./assets/sketchbook/glow/glow3.png')
//img.sketch(src='./assets/sketchbook/glow/glow4.png')
//
//
//p White on Black
//img.sketch(src='./assets/sketchbook/sketch1.png')
//img.sketch(src='./assets/sketchbook/sketch2.png')
//img.sketch(src='./assets/sketchbook/sketch3.png')

.columns
  .column(align="center")
    a.twitter-follow-button(href='https://twitter.com/pifragile?ref_src=twsrc%5Etfw' data-show-count='false')
    br
    text &copy; 2022 by pifragile

</template>

<script>
import NFTSeries from './components/NFTSeries.vue'
import NewsItem from "@/components/NewsItem";
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NFTSeries,
    NewsItem
  },
  data() {
    return {
      nfts: []
    }
  },

  methods: {
    async getData() {
      this.nfts = []
      const response = await axios.get('https://space.pifragile.com/pifragile/get-nfts/');
      let nftSeries = response.data;
      for (let nft of nftSeries) {
        let nftSet = nft['nft_set']
        nft.imageUrl = nftSet[Math.floor(Math.random() * nftSet.length)].media;
        this.nfts.push(nft)
      }
    },
  },

  async created() {
    await this.getData();
  },


  mounted() {
    let twitterScript = document.createElement('script')
    twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.head.appendChild(twitterScript)
  },

}
</script>


<style lang="scss">
@import "./assets/main.scss";
@import url('https://fonts.googleapis.com/css?family=VT323');

body {
  font-family: 'VT323', sans-serif;
  color: black;
  font-size:calc(20px + 2vw);
}
</style>