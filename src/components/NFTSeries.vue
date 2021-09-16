<template lang="pug">

.nft-box#d_csc
  h2
    a(:href='seriesUrl') {{seriesName}}
  .nft-description
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
    seriesDescription: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.nft {
  height: 400px;
  width: 400px;
}

.nft-box {
  padding: 10px;
  width: 420px;
  height: 600px;
}

.nft-description {
  height: 50px;
}
</style>
