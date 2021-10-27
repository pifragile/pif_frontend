<template lang="pug">

.nft-box#d_csc
  .title
    a(:href='seriesUrl' target='_blank') {{seriesName}}
  a(:href='nftUrl' ref="putImageHere" target='_blank')
  div(v-if='!featured').nft-description.break-text.text {{seriesDescription}}
</template>

<script>
export default {
  name: 'NFTSeries',
  props: {
    nftName: String,
    nftUrl: String,
    image: Image,
    seriesName: String,
    seriesUrl: String,
    seriesDescription: String,
    featured: Boolean
  },
  mounted() {
    this.$refs.putImageHere.appendChild(this.image);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 100%;
}

.nft-box {
  max-width: 800px;
  margin: 0 4vw 0 0;
  padding: 10px 10px 10px 0px;
}

.nft-description {
  width: 100%;
  min-height: 60px;
  white-space: normal;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
}

.break-text{
  white-space: pre-wrap;      /* CSS3 */
   white-space: -moz-pre-wrap; /* Firefox */
   white-space: -pre-wrap;     /* Opera <7 */
   white-space: -o-pre-wrap;   /* Opera 7 */
   word-wrap: break-word;      /* IE */
}

.title {
  margin: 70px 0 50px 0;
}


</style>
