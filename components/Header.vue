<template>
  <div class="fixed w-full z-40 bg-white" :class="isScroll ? 'shadow bg-white' : ''">
    <div class="container mx-auto">
      <div class="
            flex
            justify-between
            items-center
            py-4
            px-6
            md:px-10
            relative
          ">
        <div class="lg:flex-1 flex">
          <nuxt-link to="/" class="mr-0 md:mr-12">
            <img class="w-60" src="/logo.png" alt="Logo" />
          </nuxt-link>
        </div>
        <button class="buttonMenu hover:bg-gray-200 w-8 h-8 rounded-lg hover:text-white transition-colors relative">
          <i class="ri-shopping-cart-fill text-xl text-secondary" />
          <span class="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-5 h-5 text-white border-2 border-white">{{ cart.length }}</span>
          <div class="hidden listMenu pt-5 absolute top-8 right-0 cursor-default" style="width: 450px">
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
                <div v-for="(item, index) in cart" :key="index">
                  <div class="flex items-center justify-between mb-3 pb-3" :class="{'border-b border-gray-200' : index + 1 !== cart.length}">
                    <div class="flex items-center">
                      <img class="w-20" :src="item.image" :alt="item.name" />
                      <div class="text-left ml-3 flex flex-col justify-center">
                        <span class="text-secondary font-bold">{{ item.name }}</span>
                        <div class="flex items-center">
                          <button @click="minusQty(index)">
                            <i class="ri-indeterminate-circle-line text-primary" />
                          </button>
                          <span class="text-secondary text-xs mx-1">{{ item.quantity }}</span>
                          <button @click="addQty(index)">
                            <i class="ri-add-circle-line text-primary" />
                          </button>
                        </div>
                        <div class="flex items-center">
                          <span class="px-2 py-1 bg-red-300 text-xs rounded-lg text-white mr-2" v-if="item.disc > 0">{{ item.disc }}%</span>
                          <span class="line-through text-xs font-light text-secondary mr-2" v-if="item.disc > 0">Rp{{formatCurrency(item.price)}} ,- / Box </span>
                          <span class="text-secondary text-xs font-bold">Rp{{ formatCurrency(
                          item.disc > 0
                            ? calcDisc(item.price, item.disc) 
                            : item.price
                          ) }}/Box</span>
                        </div>
                      </div>
                    </div>
                    <button @click="removeItem(index)" class="place-self-start">
                      <i class="ri-close-line text-2xl text-gray-400 hover:text-primary transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-300 text-secondary pt-5">
                <div class="flex justify-between mb-1 text-sm">
                  <span>Total Harga({{ qtyCart }} Barang)</span>
                  <span>Rp{{ formatCurrency(grantotalWithOutDisc) }}</span>
                </div>
                <div class="flex justify-between mb-1 text-sm">
                  <span>Total Diskon</span>
                  <span>Rp{{ formatCurrency(grantotalDisc) }}</span>
                </div>
                <div class="flex justify-between font-bold">
                  <span>Grand Total</span>
                  <span>Rp{{ formatCurrency(grantotalWithOutDisc-grantotalDisc) }}</span>
                </div>
              </div>
              <button
                class="px-5 py-2 rounded-full border border-solid text-xs font-semibold justify-center border-primary bg-primary text-white hover:bg-white hover:text-primary items-center mt-5 w-full"
                @click="whatappLink"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </button>
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
      },
      whatappLink() {
        let listBox = ""
        this.cart.forEach((data, index) => {
          listBox += `${index+1}. ${data.name} | ${data.quantity} Box
`
        })
          let tmp = `Halo DapoerBersama,
Saya ingin memesan nasi kotak dengan rincian berikut:
${listBox}
Dikirim pada tanggal: DD-MM-YYYY HH:MM
Terima kasih.`
        window.open(
  `https://wa.me/+6283834142332?text=${encodeURI(tmp)}`,
  '_blank' // <- This is what makes it open in a new window.
)
      }
    },
    computed: {
      cart() {
        return this.$store.state.cart.dataCart
      },
      qtyCart() {
        let total = 0
        this.cart.forEach((data) => total += data.quantity)
        return total
      },
      grantotalWithOutDisc() {
        let total = 0
        this.cart.forEach((data) => total += data.price * data.quantity)
        return total
      },
      grantotalDisc() {
        let total = 0
        this.cart.forEach((data) => {
          if(data.disc > 0) {
            total += (data.price * data.quantity) * (data.disc / 100)
          }
        })
        return total
      }
    },
  }

</script>
<style>
.buttonMenu:hover .listMenu {
  display: block;
}
.buttonMenu:hover .listMenu,
.buttonMenu:hover .listMenu > div {
  width: 450px;
}
</style>
