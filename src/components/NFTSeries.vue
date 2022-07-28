<template lang="pug">

.column.is-one-quarter-desktop.is-full-mobile.is-half-tablet
  .box
    .columns
      .column
        figure.image
          img(:src="this.imageUrl")
    .columns
      .column
        a(:href="seriesUrl" target="_blank") {{seriesName}}
        

</template>

<script>
export default {
  name: 'NFTSeries',
  props: {
    imageUrl: String,
    seriesName: String,
    seriesUrl: String,
    seriesDescription: String,
  },
}
</script>



<style lang="scss" scoped>
@import "../assets/main.scss";
</style>
