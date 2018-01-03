<template lang="pug">
  footer.footer
    .container-fluid.d-flex.justify-content-between.flex-column.flex-md-row
      .product-by
        p.m-0
          | Un producto de 
          a(target='_blank', href='http://www.emprendia.net/')
            img(src='/logotipo_emprendia_horizontal_blanco.png')
      .product-copyright
        p.m-0 Clasificados gratis para regalar lo que ya no usas. &copy; {{new Date().getFullYear()}}
</template>

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

footer
  color: white
  width: 100%
  height: 60px
  line-height: 60px
  background-color: $brand-primary

  .product-by
    text-align: left
  .product-copyright
    text-align: right

  @include media-breakpoint-down(sm)
    height: auto
    line-height: 1.5
    padding-top: 1.5rem
    padding-bottom: 1.5rem

    .product-by
      text-align: center
      padding-bottom: 0.75rem
    .product-copyright
      text-align: center

  img
    height: 30px

</style>
