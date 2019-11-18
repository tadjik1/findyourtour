<template>
  <div class="card">
    <figure class="card-image-container">
      <img class="card-image-picture" :src="tour.image" :alt="tour.title" />
      <figcaption class="card-image-badge" v-if="tour.isSpecialOffer">
        <i class="fas fa-crown"></i>
        <span class="badge-text">{{ $t("special-offer-badge") }}</span>
      </figcaption>
    </figure>
    <div class="card-information">
      <h2 class="title" v-html="title"></h2>
      <div class="card-meta">
        <span class="rating" :class="ratingClassName"></span>
        <p class="price">{{ `${tour.currency} ${tour.price}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TourCard',
  props: {
    tour: {
      image: String,
      title: String,
      price: Number,
      currency: String,
      rating: Number,
      isSpecialOffer: Boolean
    }
  },
  data () {
    return {
      title: this.tour.title.length > 80 ? `${this.tour.title.slice(0, 79)}…` : this.tour.title,
      ratingClassName: `rating-${Math.round(this.tour.rating * 10 / 5) * 5}`
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,.1), 0 2px 5px 0 rgba(51,51,51,.2);
  border-radius: 8px;
  overflow: hidden;
}
.card-image-container {
  background-color: #6d7688;
  border-radius: 2px;
  outline: none;
  margin: 0;
  position: relative;
}
.card-image-picture {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  display: block;
}
.card-image-badge {
  position: absolute;
  right: 10px;
  top: 10px;
  background: red;
  color: white;
  padding: 2px 6px;
  font-size: 1rem;
  line-height: 1.3rem;
  border-radius: 4px;
}
.badge-text {
  margin-left: 5px;
}
.card-information {
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: 16px;
  justify-content: space-around;
}
.title {
  font-size: 1rem;
  line-height: 1.1rem;
  margin: 0;
  color: #1a2b49;
}
.card-meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.3rem;
  align-items: center;
}
.price, .rating {
  margin: 0;
  white-space: nowrap;
}
.rating {
  display: inline-block;
  width: 64px;
  height: 14px;
  background-image: url('https://cdn.getyourguide.com/assets/dc2ffc405852/customer/desktop/static/images/yellow-stars.svg');
  background-repeat: no-repeat;
  text-indent: -9000px;
  direction: ltr;
  vertical-align: middle;
  background-size: 64px 151px;
  background-position: -1000px;
}
.rating-0 { background-position: 0 -140px; }
.rating-5 { background-position: 0 -126px; }
.rating-10 { background-position: 0 -112px; }
.rating-15 { background-position: 0 -98px; }
.rating-20 { background-position: 0 -84px; }
.rating-25 { background-position: 0 -70px; }
.rating-30 { background-position: 0 -56px; }
.rating-35 { background-position: 0 -42px; }
.rating-40 { background-position: 0 -28px; }
.rating-45 { background-position: 0 -14px; }
.rating-50 { background-position: 0 0; }
</style>
