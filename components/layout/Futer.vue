<template lang="pug">
  footer.footer
    .container-fluid
      b-row
        b-col(md='6')
          p.m-0
            | Un producto de 
            a(target='_blank', href='http://www.emprendia.net/')
              img(src='/logotipo_emprendia_horizontal_blanco.png')
        b-col.text-right(md='6')
          p.m-0 Clasificados gratis para regalar lo que ya no usas. &copy; {{new Date().getFullYear()}}
</template>

<style lang="sass" scoped>
@import "~assets/scss/color"

footer
  color: white
  position: absolute
  bottom: 0
  width: 100%
  height: 60px
  line-height: 60px
  background-color: $brand-primary

  img
    height: 30px
</style>
