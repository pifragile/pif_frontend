<template lang="pug">

.columns.is-centered
    .column.is-half-desktop.is-full-mobile.is-10-tablet
      .box
        .columns
          .column
            figure.image
              img(:src="this.imageUrl")
        .columns
          .column
            text {{seriesName}}
        .columns
          .column
            text {{seriesDescription}}
        .columns
          .column
            a(:href="seriesUrl" target="_blank") Link: click here

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
