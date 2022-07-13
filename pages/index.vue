<template>
  <div>
    <Header />
    <div class="pt-20 container mx-auto">
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div class="text-secondary" v-for="(food, index) in foodData" :key="index">
          <img src="https://source.unsplash.com/random/250x250" alt=" random imgee" class="w-full object-cover object-center rounded-lg shadow-md">
          <div class="relative px-2 -mt-16">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h4 class="text-xl font-semibold uppercase leading-tight truncate mb-3">{{ food.name }}</h4>
              <p class="text-sm font-light mb-3">
                {{ food.desc }}
              </p>
              <span class="font-bold mb-5 block text-sm">
                Rp{{ formatCurrency(
                  food.disc > 0
                    ? calcDisc(food.price, food.disc) 
                    : food.price
                  ) }} ,- / pack
                <div v-if="food.disc > 0" class="block mt-1">
                  <span class="px-2 py-1 bg-red-300 text-xs rounded-lg">{{ food.disc }}%</span>
                  <span class="line-through text-xs font-light">Rp{{formatCurrency(food.price)}} ,- / pack </span>
                </div>
              </span>
              <button 
                class="px-5 py-2 rounded-full border border-solid text-xs font-semibold justify-center border-primary bg-primary text-white hover:bg-white hover:text-primary items-center"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  export default {
    name: 'IndexPage',
    components: {
      Header,
    },
    data() {
      return {
        foodData: [
          {
            name: "Nasi Langgi Telur",
            desc: "Dengan pilihan nasi kuning & putih, serta lauk telur balado.",
            price: 28000,
            disc: 5,
          },
          {
            name: "Nasi Langgi Special",
            desc: "Nasi langgi khas kota Solo disajikan dengan nasi kuning & putih, serta lauk ayam atau empal goreng.",
            price: 38000,
            disc: 0,
          },
          {
            name: "Nasi Langgi Komplit",
            desc: "Nasi Langgi khas Solo disajikan dengan pilihan nasi kuning & putih, serta lauk ayam atau empal goreng.",
            price: 50000,
            disc: 0,
          },
          {
            name: "Nasi Gudeg Jogja",
            desc: "Nasi Gudeg ini identik dengan kota Jogja, Dapur Solo mengemas dengan Khasnya tersendiri",
            price: 35000,
            disc: 0,
          },
          {
            name: "Nasi Ayam Goreng Sereh Berempah",
            desc: "Renyah dan gurihnya fillet Ayam bumbu rempah sereh merupakan sajian terbaik di acaramu",
            price: 35000,
            disc: 0,
          },
          {
            name: "Nasi Ayam Goreng Lengkuas",
            desc: "Ayam Goreng Lengkuas yang sedap ini merupakan sajian yang sangat menarik untuk disantap di setiap acara",
            price: 35000,
            disc: 0,
          },
          {
            name: "Nasi Empal Lombok Ijo",
            desc: "Daging Empal dengan Sambal Lombok ijo yang sudah pasti menjadi sajian acara yang menyegarkan",
            price: 37000,
            disc: 0,
          },
          {
            name: "Nasi Rendang Warisan",
            desc: "Daging rendang dengan bumbu warisan turun-temurun merupakan sajian paling terbaik di setiap acara",
            price: 32000,
            disc: 0,
          },
          {
            name: "Paket Rames Komplit",
            desc: "Paket Rames yang legendaris dan lengkap dikemas menarik khas Dapur Solo Lunch Box merupakan sajian acara yang paling cocok disetiap acara",
            price: 40000,
            disc: 0,
          },
          {
            name: "Nasi Pecel Madiun",
            desc: "Nasi Pecel Khas Madiun ini bisa jadi pilihan menu sayuran selain nasi urap",
            price: 19000,
            disc: 0,
          },
        ]
      }
    },
    methods: {
      calcDisc(price, disc) {
        const getDisc = price * (disc/100)
        return price - getDisc
      },
      formatCurrency(price) {
        return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
      }
    },
  }

</script>
