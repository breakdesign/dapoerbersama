<template>
  <div class="fixed w-full z-40 bg-white" :class="isScroll ? 'shadow bg-white' : ''">
    <div class="container mx-auto">
      <div class="
            flex
            justify-between
            md:justify-start
            items-center
            py-4
            px-6
            md:px-10
          ">
        <div class="lg:flex-1 flex">
          <nuxt-link to="/" class="mr-0 md:mr-12">
            <img class="w-60" src="/logo.png" alt="Logo" />
          </nuxt-link>
        </div>
        <button class="hover:bg-gray-200 w-8 h-8 rounded-lg hover:text-white transition-colors relative">
          <i class="ri-shopping-cart-fill text-xl text-secondary" />
          <span class="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-5 h-5 text-white border-2 border-white">0</span>
        </button>
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isScroll: false,
      }
    },
    beforeMount() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        if (window.scrollY > 85) {
          this.isScroll = true;
        } else {
          this.isScroll = false;
        }
      },
    },
  }

</script>
