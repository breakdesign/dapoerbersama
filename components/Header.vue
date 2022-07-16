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
          <span class="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-5 h-5 text-white border-2 border-white">{{ cart.length }}</span>
          <div class="hidden listMenu pt-5 absolute top-8 right-0 cursor-default">
            <div class="border border-gray-300 bg-white p-5 shadow-lg rounded-lg border-b">
              <div class="flex justify-between mb-3 border-b border-gray-300 pb-3">
                <p class="text-secondary">Keranjang ({{ cart.length }})</p>
                <nuxt-link to="/" class="text-primary text-sm">
                  Lihat Semua
                </nuxt-link>
              </div>
              <div class="text-center py-8" v-if="cart.length === 0">
                <img src="/empty.png" alt="Empty" class="mb-5 mx-auto rounded">
                <p class="text-secondary">Produk belum dipesan</p>
              </div>
              <div class="h-80 max-h-full overflow-y-scroll" v-else>
                <div class="flex items-center justify-between" v-for="(item, index) in cart" :key="index">
                  <div class="flex items-center" :class="{'mb-3' : index + 1 !== cart.length}">
                    <img class="w-20" :src="item.image" :alt="item.name" />
                    <div class="text-left ml-3 flex flex-col justify-center">
                      <span class="text-secondary font-bold">{{ item.name }}</span>
                      <div class="flex items-center">
                        <button @click="minusQty(index)">
                          <i class="ri-indeterminate-circle-line text-primary" />
                        </button>
                        <span class="text-secondary text-xs mx-1">{{ item.quantity }} box</span>
                        <button @click="addQty(index)">
                          <i class="ri-add-circle-line text-primary" />
                        </button>
                      </div>
                      <span class="font-bold text-secondary text-sm">Rp{{ formatCurrency(
                      item.disc > 0
                        ? calcDisc(item.price, item.disc) 
                        : item.price
                      ) }}</span>
                    </div>
                  </div>
                  <button @click="removeItem(index)" class="place-self-start">
                    <i class="ri-close-line text-2xl text-gray-400 hover:text-primary transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      calcDisc(price, disc) {
        const getDisc = price * (disc/100)
        return price - getDisc
      },
      formatCurrency(price) {
        return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
      },
      async addQty(index) {
        await this.$store.dispatch('cart/addQty', index);
      },
      async minusQty(index) {
        await this.$store.dispatch('cart/minusQty', index);
      },
      async removeItem(index) {
        await this.$store.dispatch('cart/removeItem', index);
      }
    },
    computed: {
      cart() {
        return this.$store.state.cart.dataCart
      }
    },
  }

</script>
