<template lang="pug">

.nft-box#d_csc
  h2
    a(:href='seriesUrl') {{seriesName}}
  div(v-if='!featured').nft-description.break-text
    p {{seriesDescription}}
  h4 {{nftName}}
  a#a_csc(:href='nftUrl')
    img.nft(:src='imageUrl')
</template>

<script>
export default {
  name: 'NFTSeries',
  props: {
    nftName: String,
    nftUrl: String,
    imageUrl: String,
    seriesName: String,
    seriesUrl: String,
    seriesDescription: String,
    featured: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.nft {
  width: 100%;
}

.nft-box {
  padding: 10px;
  max-width: 400px;
}

.nft-description {
  width: 100%;
  min-height: 60px;
  white-space: normal;
}

.break-text{
  white-space: pre-wrap;      /* CSS3 */
   white-space: -moz-pre-wrap; /* Firefox */
   white-space: -pre-wrap;     /* Opera <7 */
   white-space: -o-pre-wrap;   /* Opera 7 */
   word-wrap: break-word;      /* IE */
}


</style>
