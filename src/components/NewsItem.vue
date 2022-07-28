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
    .columns(v-if="this.text")
      .column
        text {{text}}
    .columns(v-if="this.link")
      .column
        a(:href="link" target="_blank") Link: click here

</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    imageSrcs: Array,
    title: String,
    text: String,
    link: String,
  },
}
</script>



<style lang="scss" scoped>
@import "../assets/main.scss";
</style>
