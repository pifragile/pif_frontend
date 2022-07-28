<template lang="pug">

.column.is-two-thirds-desktop.is-full-mobile.is-full-tablet
  .box
    .columns.is-flex-wrap-wrap.is-flex-direction-row.is-justify-content-center
      .column(v-for="(imageSrc, index) in imageSrcs").is-one-third
        figure.image
          img(:src="require(`../assets/${imageSrc}`)")
    .columns
      .column
        text {{title}}
    .columns
      .column
        text {{text}}

</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    imageSrcs: Array,
    title: String,
    text: String,
  },
}
</script>



<style lang="scss" scoped>
@import "../assets/main.scss";
</style>
