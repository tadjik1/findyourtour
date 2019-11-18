<template>
  <div class="main">
    <section class="header">
      <div class="container">
        <div class="header-content">
          <header class="title">{{ $t("intro") }}</header>
          <SearchForm v-model="state.input"></SearchForm>
        </div>
      </div>
    </section>
    <section class="content container">
      <Loader v-if="state.loading"></Loader>
      <p v-else-if="state.isSearchFailed" class="no-results">
        {{ $t("no-results") }}
      </p>
      <div v-else-if="state.results.length !== 0">
        <header class="section-title">{{ $t("section-results-header", { query: state.query }) }}</header>
        <div class="tour-list">
          <article class="tour" v-for="id in state.results" :key="id">
            <TourCard :tour="data.tours[id]"></TourCard>
          </article>
        </div>
      </div>
      <div v-if="state.results.length === 0">
        <header class="section-title">{{ $t("section-special-offers-header") }}</header>
        <div class="tour-list">
          <article class="tour" v-for="id in data.offers" :key="id">
            <TourCard :tour="data.tours[id]"></TourCard>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'

import data from '../assets/tours.json'

import SearchForm from './SearchForm'
import TourCard from './TourCard'
import Loader from './Loader'

export default {
  name: 'Main',
  components: {
    SearchForm,
    TourCard,
    Loader
  },
  data () {
    return {
      input: '',
      state: {
        query: '',
        loading: false,
        isSearchFailed: false,
        results: []
      },
      data: {
        fuse: null,
        tours: {/*
          [id]: tour
        */},
        offers: []
      }
    }
  },
  watch: {
    'state.input': debounce(function (value) {
      this.state.query = value
      this.state.isSearchFailed = false
      if (value.length < 3) {
        this.state.results = []
        return
      }
      this.state.loading = true
      // simulate async search
      setTimeout(() => {
        // do not touch state if user types something while we were awaiting
        // response for prev query
        if (this.state.input !== value) return
        this.state.loading = false
        this.state.results = this.data.fuse.search(value)
        if (this.state.results.length === 0) {
          this.state.isSearchFailed = true
        }
      }, 600)
    }, 300)
  },
  async mounted () {
    const tours = {}
    const offers = []

    for (const tour of data.tours) {
      tours[tour.id] = tour
      if (tour.isSpecialOffer) offers.push(tour.id)
    }

    const options = {
      shouldSort: true,
      minMatchCharLength: 3,
      threshold: 0.4,
      keys: ['title'],
      id: 'id'
    }

    this.data.fuse = new Fuse(data.tours, options)
    this.data.tours = tours
    this.data.offers = offers
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.header {
  background-image: url('https://cdn.getyourguide.com/assets/dc2ffc405852/customer/desktop/cached/home/Hero_Header_image_mobile.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
  padding: 0 4%;
}
.title {
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
}
.no-results {
  font-size: 1rem;
  line-height: 1.2rem;
}
.section-title {
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: 500;
  margin: 4px 0 10px;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 16px;
}
.tour-list {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tour {
  width: 100%;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .tour-list {
    margin: 0 -6px;
  }

  .tour {
    width: 50%;
    padding: 0 6px;
  }
}

@media (min-width: 1024px) {
  .header-content {
    padding: 0;
  }

  .section-title {
    margin: 10px 0 15px;
  }

  /* hack for aligning last row in flex, it occurs only when number of elements in row more than 2 */
  .tour-list::after {
    content: "";
    flex: auto;
  }

  .tour {
    width: 33%;
  }
}
</style>
