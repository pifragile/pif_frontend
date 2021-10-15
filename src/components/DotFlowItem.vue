<template lang="pug">
.box
  iframe(:src="url")
  .title
    h2 {{name}}
  .description
    p Size: {{size}}
      br
      | Density: {{density}}
      br
      | Color Scheme: {{colorScheme}}
      br
      | Speed: {{speed}}
      br
      |Direction: {{direction}}

</template>

<script>
export default {
  name: 'DotFlowItem',
  props: {
    url: String,
    size: String,
    direction: String,
    colorScheme: String,
    speed: String,
    density: String,
    name: String,
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.box {
  padding: 5px;
  max-width: 400px;
  background:#fff84f;
  border:1px;
  margin:5px;
}

.description{
  width:100%;
}
iframe{
border: 0;
  height: 300px;

}
.title {
  width:100%;
  text-align: center;
}

.break-text{
  white-space: pre-wrap;      /* CSS3 */
   white-space: -moz-pre-wrap; /* Firefox */
   white-space: -pre-wrap;     /* Opera <7 */
   white-space: -o-pre-wrap;   /* Opera 7 */
   word-wrap: break-word;      /* IE */
}


</style>
