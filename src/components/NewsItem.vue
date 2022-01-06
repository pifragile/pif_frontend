<template lang="pug">

.columns.is-centered
    .column.is-half-desktop.is-full-mobile.is-10-tablet
      .box
        .columns(v-for="(imageSrc, index) in imageSrcs")
          .column
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
